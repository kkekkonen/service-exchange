import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {ICategory} from '../../models/models'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    },
    form: {
      width: "100%"
    }
});

interface ICreateNewRequestProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  categories: ICategory[];
  categoryId: number;
  hasError: boolean;
  errorText: string;
};


class CreateNewRequest extends React.Component<ICreateNewRequestProps & RouteComponentProps, IState> {
  public state = {
    categories: [] as ICategory[],
    categoryId: -1,
    hasError: false,
    errorText: ""
  };
  private apiService: ApiService;
  public constructor(props: ICreateNewRequestProps & RouteComponentProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getCategories().then(categories => this.setState({ categories }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <form className={classes.form} autoComplete="off" onSubmit={event => this.handleSubmit(event, this)}>
            <FormControl fullWidth={true}>
              <TextField name="title" label="Title" required />
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="category-simple">Category</InputLabel>
              <Select
              value={this.state.categoryId}
              onChange={this.handleChange}
              inputProps={{
                name: 'categoryId',
                id: 'category-simple',
              }}
              >
                <MenuItem value={-1}>
                  <em>None</em>
                </MenuItem>
                {this.state.categories.map(category => (
                  <MenuItem value={category.id}>{category.category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth={true}>
              <TextField name="min_price" type="number" label="Min price" required />
              <TextField name="max_price" type="number" label="Max price" required />
              <TextField name="zip_code" type="number" label="Zip code" required />
              <TextField name="description" label="Description" multiline rows="4" required />
              <Button variant="contained" color="primary" className="button" type="submit">Save</Button>
              {this.state.hasError && <FormHelperText>{this.state.errorText}</FormHelperText>}
            </FormControl>
          </form>
        </Grid>
      </div>
    );
  }

  private handleChange = (event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    this.setState({[e.target.name]: e.target.value} as any);
  }

  private handleSubmit(event: any, caller: CreateNewRequest) {
    event.preventDefault();
    if (this.state.categoryId === -1) {
      this.setState({
        hasError: true,
        errorText: "You must select a category."
      });
      return;
    }
    const title = event.target.title.value;
    const categoryId = this.state.categoryId;
    const minPrice = event.target.min_price.value as number;
    const maxPrice = event.target.max_price.value as number;
    const zipCode = event.target.zip_code.value as number;
    const description = event.target.description.value;
    caller.apiService.createServiceRequest(title, categoryId, minPrice, maxPrice, description, zipCode).then(ok =>
    {
      if (ok) {
        // on success, redirect user back to my requests view
        this.props.history.push('/consumer/my_requests');
      } else {
        this.setState({
          hasError: true,
          errorText: "Save was not succesful. Try again."
        });
      }
    })
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(CreateNewRequest));
