import * as React from 'react';

import {IServiceRequest, IServiceRequestOffer} from '../../models/models'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
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
    }
});

interface IServiceRequestProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceRequest: IServiceRequest;
  requestOffers: IServiceRequestOffer[];
};


class ServiceRequest extends React.Component<IServiceRequestProps, IState> {
  public state = {
    serviceRequest: {} as IServiceRequest,
    requestOffers: [] as IServiceRequestOffer[]
  };
  private apiService: ApiService;
  public constructor(props: IServiceRequestProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getServiceRequest(this.props.match.params.id).then(serviceRequest => this.setState({ serviceRequest }));
    this.apiService.getOffersForRequest(this.props.match.params.id).then(requestOffers => this.setState({ requestOffers }));
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12} container >
            <Grid item xs={6}>
            <Avatar>
                  <ImageIcon />
                </Avatar>
              {this.state.serviceRequest.title}
              {this.state.serviceRequest.category}
              {this.state.serviceRequest.zipcode}
              {this.state.serviceRequest.timestamp}
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} container spacing={16}>
                {!this.state.serviceRequest.isOwner &&
                <Grid container>
                  <Grid item xs={12}>
                    <Button href="#/todo" variant="contained" color="secondary" className="button">
                      View profile
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button href="#/todo" variant="contained" color="secondary" className="button">
                      Make offer
                    </Button>
                  </Grid>
                </Grid>
                }
                {this.state.serviceRequest.isOwner &&
                <Grid item xs={12}>
                  <Button href="#/todo" variant="contained" color="primary" className="button">
                    Edit
                  </Button>
                </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {this.state.serviceRequest.description}
          </Grid>
          <Grid item xs={12}>
          <List>
              {this.state.requestOffers.length === 0 &&
              <Typography variant="body1" gutterBottom>
                You do not yet have received any offers. Maybe your price range is too high?
              </Typography>
              }
              {this.state.requestOffers.map(offer => (
                <ListItem key={offer.id} dense>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={`${offer.title}`} />
                  <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <CancelIcon />
                      </IconButton>
                      <IconButton aria-label="Delete">
                        <CheckIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ServiceRequest);