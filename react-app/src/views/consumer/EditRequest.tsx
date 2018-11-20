import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {ICategory} from '../../models/models'
import {IServiceRequest} from '../../models/models'
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
  request: IServiceRequest;
  hasError: boolean;
  errorText: string;
};


class CreateNewRequest extends React.Component<ICreateNewRequestProps & RouteComponentProps, IState> {
  public state = {
    categories: [] as ICategory[],
    request: { categoryid: -1 } as IServiceRequest,
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
    this.apiService.getServiceRequest(this.props.match.params.id).then(request => this.setState({ request }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <form className={classes.form} autoComplete="off" onSubmit={event => this.handleSubmit(event, this)}>
            <FormControl fullWidth={true}>
              <TextField name="title" onChange={this.handleRequestChange} value={this.state.request.title || ''} label="Title" required />
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="category-simple">Category</InputLabel>
              <Select
              value={this.state.request.categoryid}
              onChange={this.handleRequestChange}
              inputProps={{
                name: 'categoryid',
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
              <TextField name="minPrice" onChange={this.handleRequestChange} value={this.state.request.minPrice || ''} label="Min price" required />
              <TextField name="maxPrice" onChange={this.handleRequestChange} value={this.state.request.maxPrice || ''} label="Max price" required />
              <TextField name="zipcode" onChange={this.handleRequestChange} value={this.state.request.zipcode || ''} label="Zip code" required />
              <TextField name="description" onChange={this.handleRequestChange} value={this.state.request.description || ''} label="Description" multiline rows="4" required />
              <Button variant="contained" color="primary" className="button" type="submit">Save</Button>
              {this.state.hasError && <FormHelperText>{this.state.errorText}</FormHelperText>}
            </FormControl>
          </form>
        </Grid>
      </div>
    );
  }

  private handleRequestChange = (event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    const object = this.state.request;
    object[e.target.name] = e.target.value;
    this.setState({request: object} as any);
  }

  private handleSubmit(event: any, caller: CreateNewRequest) {
    event.preventDefault();
    if (this.state.request.categoryid === -1) {
      this.setState({
        hasError: true,
        errorText: "You must select a category."
      });
      return;
    }
    const title = this.state.request.title;
    const categoryId = event.target.categoryid.value as number;
    const minPrice = this.state.request.minPrice as number;
    const maxPrice = this.state.request.maxPrice as number;
    const zipCode = this.state.request.zipcode as number;
    const description = this.state.request.description;
    caller.apiService.editServiceRequest(title, categoryId, minPrice, maxPrice, description, zipCode).then(ok =>
    {
      if (ok) {
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
