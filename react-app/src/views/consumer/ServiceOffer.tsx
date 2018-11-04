import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {IServiceOffer} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    }
});

interface IServiceOfferProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceOffer: IServiceOffer;
};


class ServiceOffer extends React.Component<IServiceOfferProps, IState> {
  public state = {
    serviceOffer: {} as IServiceOffer
  };
  private apiService: ApiService;
  public constructor(props: IServiceOfferProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getServiceOffer(this.props.match.params.id).then(serviceOffer => this.setState({ serviceOffer }))
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
              {this.state.serviceOffer.title}
              {this.state.serviceOffer.category}
              {this.state.serviceOffer.zipcode}
              {this.state.serviceOffer.timestamp}
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} container spacing={16}>
                <Grid item xs={12}>
                  {this.state.serviceOffer.provider}
                </Grid>
                <Grid item xs={12}>
                  <Button href="#/todo" variant="contained" color="secondary" className="button">
                    View profile
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="#/todo" variant="contained" color="primary" className="button">
                    Accept deal
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {this.state.serviceOffer.description}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ServiceOffer);