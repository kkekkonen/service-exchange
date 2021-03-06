import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {IService} from '../../models/models'
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

interface IServiceProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  service: IService;
};


class Service extends React.Component<IServiceProps & RouteComponentProps, IState> {
  public state = {
    service: {} as IService
  };
  private apiService: ApiService;
  public constructor(props: IServiceProps & RouteComponentProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public Button_Click(id:number): void {
    this.apiService.acceptServiceOffer(id)
  }
  public componentDidMount(){
    this.apiService.getService(this.props.match.params.id).then(service => this.setState({ service }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12} container >
          <Grid item md={6} xs={12}>
              <Typography variant="h4" gutterBottom>
                {this.state.service.title}
              </Typography>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Category
                </div>
                <div className={classes.fieldLower}>
                  {this.state.service.category}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Zip code
                </div>
                <div className={classes.fieldLower}>
                  {this.state.service.zipcode}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Created on
                </div>
                <div className={classes.fieldLower}>
                  {this.state.service.timestamp}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Accepted price
                </div>
                <div className={classes.fieldLower}>
                  {this.state.service.price} €
                </div>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              {this.props.location.pathname.includes("consumer") &&
              <Grid item xs={12} container spacing={16} className={classes.detailsBox}>
                <Grid item xs={12}>
                  {this.state.service.provider}
                </Grid>
                <Grid item xs={12}>
                  <Button href={`/app/#/publicprofile/${this.state.service.providerid}`} variant="contained" color="secondary" className="button">
                    View profile
                  </Button>
                </Grid>
              </Grid>
              }
              {this.props.location.pathname.includes("provider") &&
              <Grid item xs={12} container spacing={16} className={classes.detailsBox}>
                <Grid item xs={12}>
                  {this.state.service.consumer}
                </Grid>
                <Grid item xs={12}>
                  <Button href={`/app/#/publicprofile/${this.state.service.consumerid}`} variant="contained" color="secondary" className="button">
                    View profile
                  </Button>
                </Grid>
              </Grid>
              }
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.field}>
              <div className={classes.fieldUpper}>
                Description
              </div>
              <div className={classes.fieldLower}>
                {this.state.service.description}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Service));
