import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {IService} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    },
    textfield: {
    }
});

interface IProviderAcceptedServicesProps extends WithStyles<typeof styles> {
}

interface IState {
  services: IService[];
  initialServices: IService[];
  isLoading: boolean;
  searchfor: string;
};


class ProviderAcceptedServices extends React.Component<IProviderAcceptedServicesProps, IState> {
  public state = {
    services: [] as IService[],
    initialServices: [] as IService[],
    isLoading: true,
    searchfor: ''
  };
  private apiService: ApiService;
  public constructor(props: IProviderAcceptedServicesProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyProviderServices().then(services => this.setState({ services, initialServices: services, isLoading: false }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {this.state.isLoading && <div><CircularProgress size={48} /></div>}
            {!this.state.isLoading && this.state.services.length === 0 && this.state.searchfor === '' &&
              <Typography variant="body1" gutterBottom>
                You do not have yet any accepted services (no accepted deals from consumers).
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
            {this.state.services.map(service => (
              <ListItem key={service.id} dense button component='a' href={`/app/#/provider/service/${service.id}`}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`${service.title}`} secondary={service.consumer} />
              </ListItem>
            ))}
          </List>
          </Grid>
        </Grid>
      </div>
    );
  }

  private filterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = this.state.initialServices;
    this.setState({ searchfor: event.target.value.toLowerCase() });
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    if (event.target.value.length > 0) {
      this.setState({ services: updatedList });
    } else {
      this.setState({ services: this.state.initialServices });
    }
  }

}

export default withStyles(styles, { withTheme: true })(ProviderAcceptedServices);