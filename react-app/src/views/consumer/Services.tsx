import * as React from 'react';

import {ICategory, IServiceOffer} from '../../models/models'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
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

interface IConsumerServicesProps extends WithStyles<typeof styles> {
}

interface IState {
  categories: ICategory[];
  serviceOffers: IServiceOffer[];
  isLoading: boolean;
};


class ConsumerServices extends React.Component<IConsumerServicesProps, IState> {
  public state = {
    categories: [] as ICategory[],
    serviceOffers: [] as IServiceOffer[],
    isLoading: true
  };
  private apiService: ApiService;
  public constructor(props: IConsumerServicesProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getCategories().then(categories => this.setState({ categories }))
    this.apiService.getAllServiceOffers().then(serviceOffers => this.setState({ serviceOffers, isLoading: false }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {this.state.isLoading && <div><CircularProgress size={48} /></div>}
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
}

export default withStyles(styles, { withTheme: true })(ConsumerServices);