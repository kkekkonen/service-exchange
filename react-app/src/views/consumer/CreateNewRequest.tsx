import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
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
    }
});

interface ICreateNewRequestProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceOffer: IServiceOffer;
};


class CreateNewRequest extends React.Component<ICreateNewRequestProps, IState> {
  public state = {
    serviceOffer: {} as IServiceOffer
  };
  private apiService: ApiService;
  public constructor(props: ICreateNewRequestProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getServiceOffer(this.props.match.params.id).then(serviceOffer => this.setState({ serviceOffer }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <form noValidate autoComplete="off" onSubmit={event => this.handleSubmit(event, this)}>
            <FormControl fullWidth={true}>
              <TextField name="title" label="Title" />
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="category-simple">Category</InputLabel>
              <Select
              inputProps={{
                name: 'category',
                id: 'category-simple',
              }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth={true}>
              <TextField name="min_price" label="Min price" />
              <TextField name="max_price" label="Max price" />
              <TextField name="zip_price" label="Zip code" />
              <TextField name="description" label="Description" multiline rows="4" />
              <Button variant="contained" color="primary" className="button" type="submit">Save</Button>
            </FormControl>
          </form>
        </Grid>
      </div>
    );
  }

  private handleSubmit(event: any, caller: CreateNewRequest) {
    event.preventDefault();
    console.log('A Form was submitted: ', event);
    console.log(event.target.title.value);
    const title = event.target.title.value;
    caller.apiService.createServiceRequest(title).then(ok =>
    {
      if (ok) {
        alert("Save was succesful.");
      } else {
        alert("Save was not succesful.");
      }
    })
  }
}

export default withStyles(styles, { withTheme: true })(CreateNewRequest);