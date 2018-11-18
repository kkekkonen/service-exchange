import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../services/apiservice'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {IUserProfile} from '../models/models';
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


interface IUserPublicProfileProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  userProfile: IUserProfile;
};

class PublicProfile extends React.Component<IUserPublicProfileProps, IState> {
  public state = {
    userProfile: {} as IUserProfile,
  };
  private apiService: ApiService;
  public constructor(props: IUserPublicProfileProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getUserProfile(this.props.match.params.id).then(userProfile => {
        this.setState({ userProfile })
      }
    )
  }

  public render() {
    console.log('render', this.state)
    const { classes } = this.props;
    return (
      <div>
      <Grid className={classes.root} container spacing={16}>
        <Grid item md={6} xs={12}>
            <Typography variant="h4" gutterBottom>
              {this.state.userProfile.username}
            </Typography>
            <div className={classes.field}>
              <div className={classes.fieldUpper}>
                Full name
              </div>
              <div className={classes.fieldLower}>
                {this.state.userProfile.firstName} {this.state.userProfile.lastName}
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.fieldUpper}>
                Email address
              </div>
              <div className={classes.fieldLower}>
                {this.state.userProfile.email}
              </div>
            </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid item xs={12} container spacing={16} className={classes.detailsBox}>
            <Grid item xs={12}>
              <Button href={`mailto:${this.state.userProfile.email}`} variant="contained" color="primary" className="button">
                Send message
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PublicProfile);