import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {IService} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    }
});

interface IProviderAcceptedServicesProps extends WithStyles<typeof styles> {
}

interface IState {
  services: IService[];
  isLoading: boolean;
};


class ProviderAcceptedServices extends React.Component<IProviderAcceptedServicesProps, IState> {
  public state = {
    services: [] as IService[],
    isLoading: true
  };
  private apiService: ApiService;
  public constructor(props: IProviderAcceptedServicesProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyProviderServices().then(services => this.setState({ services }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {this.state.isLoading && <div><CircularProgress size={48} /></div>}
            {!this.state.isLoading && this.state.services.length === 0 &&
              <Typography variant="body1" gutterBottom>
                You do not have yet any accepted services (no accepted deals from consumers).
              </Typography>
            }
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
}

export default withStyles(styles, { withTheme: true })(ProviderAcceptedServices);