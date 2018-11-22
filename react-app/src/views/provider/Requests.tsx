import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {IServiceRequest} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    },
    textfield: {
    }
});

interface IRequestsProps extends WithStyles<typeof styles> {
}

interface IState {
  serviceRequests: IServiceRequest[];
  initialServiceRequests: IServiceRequest[];
  isLoading: boolean;
  searchfor: string;
};


class Requests extends React.Component<IRequestsProps, IState> {
  public state = {
    serviceRequests: [] as IServiceRequest[],
    initialServiceRequests: [] as IServiceRequest[],
    isLoading: true,
    searchfor: ''
  };
  private apiService: ApiService;
  public constructor(props: IRequestsProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getAllServiceRequests().then(serviceRequests => this.setState({ serviceRequests, initialServiceRequests: serviceRequests, isLoading: false }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {this.state.isLoading && <div><CircularProgress size={48} /></div>}
            <TextField
              name='search'
              fullWidth={true}
              className={classes.textfield}
              placeholder="Search"
              value={this.state.searchfor || ''}
              onChange={this.filterList}
              margin="normal"
            />
            <Divider />
            {!this.state.isLoading && this.state.serviceRequests.map(request => (
              <ListItem key={request.id} dense button component='a' href={`/app/#/provider/request/${request.id}`}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`${request.title}`} secondary={request.consumer} />
              </ListItem>
            ))}
          </List>
          </Grid>
        </Grid>
      </div>
    );
  }

  private filterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = this.state.initialServiceRequests;
    this.setState({ searchfor: event.target.value.toLowerCase() });
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    if (event.target.value.length > 0) {
      this.setState({ serviceRequests: updatedList });
    } else {
      this.setState({ serviceRequests: this.state.initialServiceRequests });
    }
  }

}

export default withStyles(styles, { withTheme: true })(Requests);