import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {ICategory} from '../../models/models'
import {IServiceOffer} from '../../models/models'
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

interface IEditServiceOfferProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceOffer: IServiceOffer;
  categories: ICategory[];
  hasError: boolean;
  errorText: string;
};


class EditServiceOffer extends React.Component<IEditServiceOfferProps & RouteComponentProps, IState> {
  public state = {
    serviceOffer: { categoryid: -1 } as IServiceOffer,
    categories: [] as ICategory[],
    hasError: false,
    errorText: ""
  };
  private apiService: ApiService;
  public constructor(props: IEditServiceOfferProps & RouteComponentProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    if (this.props.match.params.id) {
      this.apiService.getServiceOffer(this.props.match.params.id).then(serviceOffer => this.setState({ serviceOffer }));
    }
    this.apiService.getCategories().then(categories => this.setState({ categories }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <form className={classes.form} autoComplete="off" onSubmit={event => this.handleSubmit(event, this)}>
            <FormControl fullWidth={true}>
              <TextField name="title" label="Title" required value={this.state.serviceOffer.title || ''} onChange={this.handleOfferChange} />
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="category-simple">Category</InputLabel>
              <Select
              value={this.state.serviceOffer.categoryid}
              onChange={this.handleOfferChange}
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
              <TextField name="minPrice" type="number" label="Min price" required value={this.state.serviceOffer.minPrice || ''} onChange={this.handleOfferChange} />
              <TextField name="maxPrice" type="number" label="Max price" required value={this.state.serviceOffer.maxPrice || ''} onChange={this.handleOfferChange} />
              <TextField name="zipcode" type="number" label="Zip code" required value={this.state.serviceOffer.zipcode || ''} onChange={this.handleOfferChange} />
              <TextField name="description" label="Description" multiline rows="4" required value={this.state.serviceOffer.description || ''} onChange={this.handleOfferChange} />
              <Button variant="contained" color="primary" className="button" type="submit">Save</Button>
              {this.state.hasError && <FormHelperText>{this.state.errorText}</FormHelperText>}
            </FormControl>
          </form>
        </Grid>
      </div>
    );
  }

  private handleOfferChange = (event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    const object = this.state.serviceOffer;
    object[e.target.name] = e.target.value;
    this.setState({request: object} as any);
  }

  private handleSubmit(event: any, caller: EditServiceOffer) {
    event.preventDefault();
    if (this.state.serviceOffer.categoryid === -1) {
      this.setState({
        hasError: true,
        errorText: "You must select a category."
      });
      return;
    }
    const title = event.target.title.value;
    const categoryId = event.target.categoryid.value as number;
    const minPrice = event.target.minPrice.value as number;
    const maxPrice = event.target.maxPrice.value as number;
    const zipCode = event.target.zipcode.value as number;
    const description = event.target.description.value;

    if (this.state.serviceOffer.id) {
      caller.apiService.editServiceOffer(title, categoryId, minPrice, maxPrice, description, zipCode, this.state.serviceOffer.id).then(ok =>
        {
          if (ok) {
            // on success, redirect user back to my service offer view
            this.props.history.goBack();
          } else {
            this.setState({
              hasError: true,
              errorText: "Save was not succesful. Try again."
            });
          }
        })
    } else {
      caller.apiService.createServiceOffer(title, categoryId, minPrice, maxPrice, description, zipCode).then(ok =>
      {
        if (ok) {
          // on success, redirect user back to my service offers view
          this.props.history.push('/provider/my_service_offers');
        } else {
          this.setState({
            hasError: true,
            errorText: "Save was not succesful. Try again."
          });
        }
      })
    }
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(EditServiceOffer));