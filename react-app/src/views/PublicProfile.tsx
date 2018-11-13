import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../services/apiservice'
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
      fontWeight: "bold"
    },
    fieldLower: {

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
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {this.state.userProfile.username}
            </Typography>
            <div className={classes.field}>
              <div className={classes.fieldUpper}>
                Name
              </div>
              <div className={classes.fieldLower}>
                {this.state.userProfile.firstName} {this.state.userProfile.lastName}
              </div>
            </div>
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PublicProfile);