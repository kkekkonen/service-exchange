import * as React from 'react';

import {ICategory, IServiceOffer} from '../../models/models'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
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
    },
});

interface IConsumerServicesProps extends WithStyles<typeof styles> {
}

interface IState {
  categories: ICategory[];
  serviceOffers: IServiceOffer[];
  initialServiceOffers: IServiceOffer[];
  isLoading: boolean;
  searchfor: string;
};


class ConsumerServices extends React.Component<IConsumerServicesProps, IState> {
  public state = {
    categories: [] as ICategory[],
    serviceOffers: [] as IServiceOffer[],
    initialServiceOffers: [] as IServiceOffer[],
    isLoading: true,
    searchfor: ''
  };
  private apiService: ApiService;
  public constructor(props: IConsumerServicesProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getCategories().then(categories => this.setState({ categories }))
    this.apiService.getAllServiceOffers().then(serviceOffers => this.setState({ serviceOffers, initialServiceOffers: serviceOffers, isLoading: false }))
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
            {!this.state.isLoading && this.state.serviceOffers.map(serviceOffer => (
              <ListItem key={serviceOffer.id} dense button component='a' href={`/app/#/consumer/serviceoffer/${serviceOffer.id}`}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`${serviceOffer.title}`} secondary={serviceOffer.provider} />
              </ListItem>
            ))}
          </List>
          </Grid>
        </Grid>
      </div>
    );
  }

  private filterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = this.state.initialServiceOffers;
    this.setState({ searchfor: event.target.value.toLowerCase() });
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    if (event.target.value.length > 0) {
      this.setState({ serviceOffers: updatedList });
    } else {
      this.setState({ serviceOffers: this.state.initialServiceOffers });
    }
  }

}

export default withStyles(styles, { withTheme: true })(ConsumerServices);