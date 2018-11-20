import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../services/apiservice'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

import {IUserProfile} from '../models/models';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    }
});

interface IUserProfileProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  userProfile: IUserProfile;
  hasError: boolean;
  errorText: string;
};

class Profile extends React.Component<IUserProfileProps, IState> {
  public state = {
    userProfile: {} as IUserProfile,
    hasError: false,
    errorText: "",
  };
  private apiService: ApiService;
  public constructor(props: IUserProfileProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getLoggedUserProfile().then(userProfile => {
        this.setState({ userProfile })
      }
    )
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className="Main">
        <Grid className={classes.root} container>
          <Typography variant="h5" gutterBottom>
            Edit profile
          </Typography>
          <FormControl fullWidth={true}>
            <TextField name="username" label="Username" onChange={this.handleProfileChange} value={this.state.userProfile.username || ''} required/>
            <TextField name="firstName" label="First name" onChange={this.handleProfileChange} value={this.state.userProfile.firstName || ''} required />
            <TextField name="lastName" label="Last name" onChange={this.handleProfileChange} value={this.state.userProfile.lastName || ''} required />
            <TextField name="email" label="Email" onChange={this.handleProfileChange} value={this.state.userProfile.email  || ''} required />
            <Button variant="contained" color="primary" className="button">Save</Button>
            {this.state.hasError && <FormHelperText>{this.state.errorText}</FormHelperText>}
          </FormControl>
        </Grid>
        <Divider />
        <Grid className={classes.root} container>
          <Typography variant="h5" gutterBottom>
            Change password
          </Typography>
          <FormControl fullWidth={true}>
            <TextField name="currentPassword" label="Current password" type="password" onChange={this.handleProfileChange} required />
            <TextField name="newPassword"label="New password" type="password" onChange={this.handleProfileChange} required />
            <TextField name="newPasswordAgain" label="New password again" type="password" onChange={this.handleProfileChange} required />
            <Button variant="contained" color="primary" className="button">Change</Button>
            {this.state.hasError && <FormHelperText>{this.state.errorText}</FormHelperText>}
          </FormControl>
        </Grid>
      </div>
    );
  }

  private handleProfileChange = (event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    const object = this.state.userProfile;
    object[e.target.name] = e.target.value;
    console.log(object)
    this.setState({userProfile: object} as any);
  }


}

export default withStyles(styles, { withTheme: true })(Profile);
