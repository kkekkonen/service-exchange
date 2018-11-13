import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {IServiceRequest} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    }
});

interface IRequestsProps extends WithStyles<typeof styles> {
}

interface IState {
  serviceRequests: IServiceRequest[];
};


class Requests extends React.Component<IRequestsProps, IState> {
  public state = {
    serviceRequests: [] as IServiceRequest[]
  };
  private apiService: ApiService;
  public constructor(props: IRequestsProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getAllServiceRequests().then(serviceRequests => this.setState({ serviceRequests }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {this.state.serviceRequests.map(request => (
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
}

export default withStyles(styles, { withTheme: true })(Requests);