import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {IServiceOffer} from '../../models/models'
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

interface IServiceOfferProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceOffer: IServiceOffer;
  hasError: boolean;
  errorText: string;
};


class ServiceOffer extends React.Component<IServiceOfferProps & RouteComponentProps, IState> {
  public state = {
    serviceOffer: {} as IServiceOffer,
    hasError: false,
    errorText: ""
  };
  private apiService: ApiService;
  public constructor(props: IServiceOfferProps & RouteComponentProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public Button_Click(id:number): void {
    this.apiService.acceptServiceOffer(id).then(ok => {
      if (ok) {
        this.props.history.push('/consumer/accepted_services');
      } else {
        this.setState({
          hasError: true,
          errorText: "You have already accepted this service."
        });
      }
    })
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
          <Grid item md={6} xs={12}>
              <Typography variant="h4" gutterBottom>
                {this.state.serviceOffer.title}
              </Typography>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Category
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceOffer.category}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Zip code
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceOffer.zipcode}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Created on
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceOffer.timestamp}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Price
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceOffer.minPrice} €
                </div>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid item xs={12} container spacing={16} className={classes.detailsBox}>
                <Grid item xs={12}>
                  {this.state.serviceOffer.provider}
                </Grid>
                <Grid item xs={12}>
                  <Button href={`/app/#/publicprofile/${this.state.serviceOffer.providerid}`} variant="contained" color="secondary" className="button">
                    View profile
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={ () => this.Button_Click(this.state.serviceOffer.id)} variant="contained" color="primary" className="button">
                    Accept deal ({this.state.serviceOffer.minPrice} €)
                  </Button>
                </Grid>
                {this.state.hasError && <Grid item xs={12}>{this.state.errorText}</Grid>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.field}>
              <div className={classes.fieldUpper}>
                Description
              </div>
              <div className={classes.fieldLower}>
                {this.state.serviceOffer.description}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(ServiceOffer));