import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import AddIcon from '@material-ui/icons/Add';
import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import {IServiceOffer} from '../../models/models'
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
    textfield: {
    }
});

interface IMyServiceOffersProps extends WithStyles<typeof styles> {
}

interface IState {
  myServiceOffers: IServiceOffer[];
  myInitialServiceOffers: IServiceOffer[];
  isLoading: boolean;
  searchfor: string;
};


class MyServiceOffers extends React.Component<IMyServiceOffersProps, IState> {
  public state = {
    myServiceOffers: [] as IServiceOffer[],
    myInitialServiceOffers: [] as IServiceOffer[],
    isLoading: true,
    searchfor: ''
  };
  private apiService: ApiService;
  public constructor(props: IMyServiceOffersProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyServiceOffers().then(myServiceOffers => this.setState({ myServiceOffers, myInitialServiceOffers: myServiceOffers, isLoading: false }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
              {this.state.isLoading && <div><CircularProgress size={48} /></div>}
              {!this.state.isLoading && this.state.myServiceOffers.length === 0 && this.state.searchfor === '' &&
              <Typography variant="body1" gutterBottom>
                You do not yet have any service offers. Why not create one now if you have something you can provide?
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
              {this.state.myServiceOffers.map(serviceOffer => (
                <ListItem key={serviceOffer.id} dense button component='a' href={`/app/#/provider/serviceoffer/${serviceOffer.id}`}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={`${serviceOffer.title}`} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" href={`/app/#/provider/edit_service_offer/${serviceOffer.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.deleteServiceOffer(serviceOffer.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          <Button variant="fab" className={classes.fab} color="primary" component='a' href={"/app/#/provider/create_service_offer"}>
            <AddIcon />
          </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  private deleteServiceOffer(id:number): void {
    this.apiService.deleteServiceOffer(id).then(ok => {
      if (ok) {
        const myServiceOffers = this.state.myServiceOffers;
        const offer = myServiceOffers.find(r => r.id === id)!;
        const deleteIdx = myServiceOffers.indexOf(offer);
        myServiceOffers.splice(deleteIdx, 1);
        this.setState({
          myServiceOffers
        });
      }
    });
  }

  private filterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = this.state.myInitialServiceOffers;
    this.setState({ searchfor: event.target.value.toLowerCase() });
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    if (event.target.value.length > 0) {
      this.setState({ myServiceOffers: updatedList });
    } else {
      this.setState({ myServiceOffers: this.state.myInitialServiceOffers });
    }
  }

}

export default withStyles(styles, { withTheme: true })(MyServiceOffers);