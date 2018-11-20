import * as React from 'react';

import {IServiceRequest, IServiceRequestOffer} from '../../models/models'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
});

interface IMyOffersProps extends WithStyles<typeof styles> {
}

interface IState {
  myOffers: IServiceRequestOffer[];
  serviceRequests: IServiceRequest[];
  isLoading: boolean;
};


class MyOffers extends React.Component<IMyOffersProps, IState> {
  public state = {
    myOffers: [] as IServiceRequestOffer[],
    serviceRequests: [] as IServiceRequest[],
    isLoading: true
  };
  private apiService: ApiService;
  public constructor(props: IMyOffersProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyServiceRequestOffers().then(myOffers => {
      this.setState({ myOffers, isLoading: false });
      this.state.myOffers.forEach(offer => {
        this.apiService.getServiceRequest(offer.requestId).then(request => {
          const serviceRequests = this.state.serviceRequests;
          serviceRequests.push(request);
          this.setState({ serviceRequests });
        });
      });
    })
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
              {this.state.isLoading && <div><CircularProgress size={48} /></div>}
              {!this.state.isLoading && this.state.myOffers.length === 0 &&
              <Typography variant="body1" gutterBottom>
                You have not made any offers. Go browse the requests and make offers.
              </Typography>
              }
              {this.state.myOffers.map(offer => (
                <ListItem key={offer.id} dense button component='a' href={`/app/#/provider/request/${offer.requestId}`}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={`${offer.price}€`} secondary={`${this.state.serviceRequests.find(x => x.id === offer.requestId) ? this.state.serviceRequests.find(x => x.id === offer.requestId)!.title : ''}`} />
                  <ListItemSecondaryAction>
                    {offer.status}
                    <IconButton aria-label="Delete" onClick={() => this.deleteOffer(offer.id)}>
                      <DeleteForeverIcon />
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

  private deleteOffer(id:number): void {
    this.apiService.deleteServiceRequestOffer(id).then(ok => {
      if (ok) {
        const myOffers = this.state.myOffers;
        const offer = myOffers.find(o => o.id === id)!;
        const deleteIdx = myOffers.indexOf(offer);
        myOffers.splice(deleteIdx, 1);
        this.setState({
          myOffers
        });
      }
    });
  }
}

export default withStyles(styles, { withTheme: true })(MyOffers);