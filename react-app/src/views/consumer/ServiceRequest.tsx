import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {IServiceRequest} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
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
};


class ServiceRequest extends React.Component<IServiceRequestProps, IState> {
  public state = {
    serviceRequest: {} as IServiceRequest
  };
  private apiService: ApiService;
  public constructor(props: IServiceRequestProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getServiceRequest(this.props.match.params.id).then(serviceRequest => this.setState({ serviceRequest }))
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
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ServiceRequest);