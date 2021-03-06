import * as React from 'react';

import {IServiceRequest, IServiceRequestOffer} from '../../models/models'
import { RouteComponentProps, withRouter } from "react-router-dom";
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
    },
    field: {
      marginBottom: "10px"
    },
    fieldUpper: {
      fontWeight: "normal",
      color: "#0D9C6F"
    },
    fieldLower: {

    },
    detailsBox: {
      padding: "1em",
      backgroundColor: "#eee",
      borderRadius: "4px"
    }
});

interface IServiceRequestProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceRequest: IServiceRequest;
  requestOffers: IServiceRequestOffer[];
  hasError: boolean;
  errorText: string;
};


class ServiceRequest extends React.Component<IServiceRequestProps & RouteComponentProps, IState> {
  public state = {
    serviceRequest: {} as IServiceRequest,
    requestOffers: [] as IServiceRequestOffer[],
    hasError: false,
    errorText: ""
  };
  private apiService: ApiService;
  public constructor(props: IServiceRequestProps & RouteComponentProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public accept_offer(id:number): void {
    this.apiService.acceptOffer(id).then(ok =>
    {
      if (ok) {
        this.props.history.push('/consumer/accepted_services');
      } else {
        this.setState({
          hasError: true,
          errorText: "Save was not succesful. Try again."
        });
      }
    })
  }
  public decline_offer(id:number): void {
    this.apiService.declineOffer(id).then(ok =>
    {
      if (ok) {
        this.apiService.getOffersForRequest(this.props.match.params.id).then(requestOffers => this.setState({ requestOffers }));
      } else {
        this.setState({
          hasError: true,
          errorText: "Decline not successful."
        });
      }
    })
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
            <Grid item md={6} xs={12}>
              <Typography variant="h4" gutterBottom>
                {this.state.serviceRequest.title}
              </Typography>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Category
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceRequest.category}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Zip code
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceRequest.zipcode}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Created on
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceRequest.timestamp}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Wanted price range
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceRequest.minPrice}€ - {this.state.serviceRequest.maxPrice}€
                </div>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid item xs={12} container spacing={16} className={classes.detailsBox}>
                {this.state.serviceRequest.isOwner &&
                <Grid item xs={12}>
                  <Button href={"#/consumer/edit_request/"+this.props.match.params.id} variant="contained" color="primary" className="button">
                    Edit
                  </Button>
                </Grid>
                }
                {this.state.serviceRequest.isOwner &&
                <Grid item xs={12}>
                  <Button onClick={() => this.deleteRequest()} variant="contained" color="primary" className="button" style= {
                  {
                    backgroundColor: '#ff1744',
                  }}>
                    Delete
                  </Button>
                </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.field}>
              <div className={classes.fieldUpper}>
                Description
              </div>
              <div className={classes.fieldLower}>
                {this.state.serviceRequest.description}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Offers
          </Typography>
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
                  <ListItemText primary={`${offer.price}€`} secondary={offer.provider}/>
                  <ListItemSecondaryAction>
                      <IconButton aria-label="Accept" onClick={ () => this.accept_offer(offer.id)}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton aria-label="Decline" onClick={ () => this.decline_offer(offer.id)}>
                        <CancelIcon />
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

  private deleteRequest(): void {
    this.apiService.deleteServiceRequest(this.state.serviceRequest.id).then(ok => {
      if (ok) {
        this.props.history.goBack();
      } else {
        this.setState({
          hasError: true,
          errorText: "Delete was not succesful."
        });
      }
    });
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(ServiceRequest));
