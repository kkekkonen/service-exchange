import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import AddIcon from '@material-ui/icons/Add';
import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import {IServiceRequest} from '../../models/models'
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    badge: {
      backgroundColor: '#0D9C6F',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100%',
      textAlign: 'center',
      display: 'flex',
      width: '28px',
      height: '28px',
      textDecoration: 'none',
      fontWeight: 'bold',
      color: '#fff'
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
            {this.state.myRequests.length === 0 &&
              <Typography variant="body1" gutterBottom>
                You do not yet have any requests. Why not create one now if you need a service?
              </Typography>
            }
            {this.state.myRequests.map(request => (
              <ListItem key={request.id} dense button component='a' href={`/app/#/request/${request.id}`}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`${request.title}`} />
                <ListItemSecondaryAction className={classes.center}>
                  {request.pending > 0 && <em className={classes.badge}>{request.pending}</em>}
                  <IconButton aria-label="Edit" href={`/app/#/consumer/edit_request/${request.id}`}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={() => this.deleteRequest(request.id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button variant="fab" className={classes.fab} color="primary" component='a' href={"/app/#/consumer/create_request"}>
            <AddIcon />
          </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  private deleteRequest(id:number): void {
    this.apiService.deleteServiceRequest(id).then(ok => {
      if (ok) {
        const myRequests = this.state.myRequests;
        const request = myRequests.find(r => r.id === id)!;
        const deleteIdx = myRequests.indexOf(request);
        myRequests.splice(deleteIdx, 1);
        this.setState({
          myRequests
        });
      }
    });
  }
}

export default withStyles(styles, { withTheme: true })(MyRequests);