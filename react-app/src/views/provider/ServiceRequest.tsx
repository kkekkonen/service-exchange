import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {IServiceRequest} from '../../models/models'
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Toolbar from '@material-ui/core/Toolbar';
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
    },
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    form: {
      width: "100%",
      margin: "20px"
    }
});

interface IProviderServiceRequestProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  serviceRequest: IServiceRequest;
  offerDialogOpen: boolean;
};

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

class ProviderServiceRequest extends React.Component<IProviderServiceRequestProps & RouteComponentProps, IState> {
  public state = {
    serviceRequest: {} as IServiceRequest,
    offerDialogOpen: false
  };
  private apiService: ApiService;
  public constructor(props: IProviderServiceRequestProps & RouteComponentProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getServiceRequest(this.props.match.params.id).then(serviceRequest => this.setState({ serviceRequest }));
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.offerDialogOpen}
          onClose={this.handleCloseOfferDialog}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleCloseOfferDialog} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Make offer
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={16}>
            <form className={classes.form} autoComplete="off" onSubmit={event => this.handleOfferSubmit(event, this)}>
              <FormControl fullWidth={true}>
                <Grid item xs={12} container spacing={16}>
                  <Grid item xs={12}>
                    <TextField fullWidth={true} name="price" label="Offered price" required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth={true} variant="contained" color="primary" className="button" type="submit">Make offer</Button>
                  </Grid>
                </Grid>
              </FormControl>
            </form>
          </Grid>
        </Dialog>

        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12} container >
            <Grid item md={6} xs={12}>
              <Typography variant="h4" gutterBottom>
                {this.state.serviceRequest.title}
              </Typography>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Category
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceRequest.category}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Zip code
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceRequest.zipcode}
                </div>
              </div>
              <div className={classes.field}>
                <div className={classes.fieldUpper}>
                  Created on
                </div>
                <div className={classes.fieldLower}>
                  {this.state.serviceRequest.timestamp}
                </div>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid item xs={12} container spacing={16} className={classes.detailsBox}>
                {!this.state.serviceRequest.isOwner &&
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <Button href={`/app/#/publicprofile/${this.state.serviceRequest.consumerid}`} variant="contained" color="secondary" className="button">
                      View profile
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={this.handleClickOpenOfferDialog} variant="contained" color="primary" className="button">
                      Make offer
                    </Button>
                  </Grid>
                </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.field}>
              <div className={classes.fieldUpper}>
                Description
              </div>
              <div className={classes.fieldLower}>
                {this.state.serviceRequest.description}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  private handleClickOpenOfferDialog = () => {
    this.setState({ offerDialogOpen: true });
  };

  private handleCloseOfferDialog = () => {
    this.setState({ offerDialogOpen: false });
  };

  private handleOfferSubmit(event: any, caller: ProviderServiceRequest) {
    event.preventDefault();
    const price = event.target.price.value as number;
    const description = "";
    caller.apiService.createServiceRequestOffer(this.props.match.params.id, price, description).then(ok =>
    {
      if (ok) {
        // on success, redirect user to my offers view
        this.props.history.push('/provider/my_offers');
        // this.setState({ offerDialogOpen: false });
      } else {
        // error
      }
    })
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(ProviderServiceRequest));
