import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import AddIcon from '@material-ui/icons/Add';
import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
});

interface IMyRequestsProps extends WithStyles<typeof styles> {
}

interface IState {
  myRequests: IServiceRequest[];
};


class MyRequests extends React.Component<IMyRequestsProps, IState> {
  public state = {
    myRequests: [] as IServiceRequest[]
  };
  private apiService: ApiService;
  public constructor(props: IMyRequestsProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyRequests().then(myRequests => this.setState({ myRequests }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {this.state.myRequests.map(request => (
              <ListItem key={request.id} dense button component='a' href={`/app/#/consumer/serviceoffer/${request.id}`}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`${request.title}`} />
              </ListItem>
            ))}
          </List>
          <Button variant="fab" className={classes.fab} color="primary">
            <AddIcon />
          </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyRequests);