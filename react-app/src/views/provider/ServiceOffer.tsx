import * as React from 'react';

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
      fontWeight: "bold"
    },
    fieldLower: {

    }
});

interface IProviderServiceOfferProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceOffer: IServiceOffer;
};


class ProviderServiceOffer extends React.Component<IProviderServiceOfferProps, IState> {
  public state = {
    serviceOffer: {} as IServiceOffer
  };
  private apiService: ApiService;
  public constructor(props: IProviderServiceOfferProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public Button_Click(id:number): void {
    this.apiService.acceptServiceOffer(id)
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
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid item xs={12} container spacing={16}>
                <Grid item xs={12}>
                  <Button href="#/todo" variant="contained" color="primary" className="button">
                    Edit
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

export default withStyles(styles, { withTheme: true })(ProviderServiceOffer);
