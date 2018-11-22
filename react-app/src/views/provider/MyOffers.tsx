import * as React from 'react';

import {IServiceRequest, IServiceRequestOffer} from '../../models/models'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
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
    pending: {
      backgroundColor: "#ff9100",
      color: "#fff",
      borderRadius: "4px",
      padding: "0.5em",
      fontSize: "12px"
    },
    rejected: {
      backgroundColor: "#ff1744",
      color: "#fff",
      borderRadius: "4px",
      padding: "0.5em",
      fontSize: "12px"
    },
    textfield: {
    }
});

interface IMyOffersProps extends WithStyles<typeof styles> {
}

interface IState {
  myOffers: IServiceRequestOffer[];
  myInitialOffers: IServiceRequestOffer[];
  serviceRequests: IServiceRequest[];
  isLoading: boolean;
  searchfor: string;
};


class MyOffers extends React.Component<IMyOffersProps, IState> {
  public state = {
    myOffers: [] as IServiceRequestOffer[],
    myInitialOffers: [] as IServiceRequestOffer[],
    serviceRequests: [] as IServiceRequest[],
    isLoading: true,
    searchfor: ''
  };
  private apiService: ApiService;
  public constructor(props: IMyOffersProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyServiceRequestOffers().then(myOffers => {
      this.setState({ myOffers, myInitialOffers: myOffers, isLoading: false });
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
              {!this.state.isLoading && this.state.myOffers.length === 0 && this.state.searchfor === '' &&
              <Typography variant="body1" gutterBottom>
                You have not made any offers. Go browse the requests and make offers.
              </Typography>
              }
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
              {this.state.myOffers.map(offer => (
                <ListItem key={offer.id} dense button component='a' href={`/app/#/provider/request/${offer.requestId}`}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={`${offer.price}€`} secondary={`${this.state.serviceRequests.find(x => x.id === offer.requestId) ? this.state.serviceRequests.find(x => x.id === offer.requestId)!.title : ''}`} />
                  <ListItemSecondaryAction>
                    {offer.status === "PENDING" && <span className={classes.pending}>{offer.status}</span>}
                    {offer.status === "REJECTED" && <span className={classes.rejected}>{offer.status}</span>}
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

  private filterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = this.state.myInitialOffers;
    this.setState({ searchfor: event.target.value.toLowerCase() });
    updatedList = updatedList.filter((item) => {
      return this.state.serviceRequests.find(x => x.id === item.requestId)!.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    if (event.target.value.length > 0) {
      this.setState({ myOffers: updatedList });
    } else {
      this.setState({ myOffers: this.state.myInitialOffers });
    }
  }

}

export default withStyles(styles, { withTheme: true })(MyOffers);