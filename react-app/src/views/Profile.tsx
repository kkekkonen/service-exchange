import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../services/apiservice'
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

import {IUserProfile} from '../models/models';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    },
    form: {
      width: "100%"
    },
    icon: {
      fontSize: 20,
    },
    userNameNotice: {
      marginBottom: 16,
    },
    changePasswordGrid: {
      marginTop: 16,
    }
});

interface IUserProfileProps extends WithStyles<typeof styles> {
  match: any;
}

interface IState {
  userProfile: IUserProfile;
  profileEditSuccess: boolean;
  passwordChangeSuccess: boolean;
  hasErrorOnEdit: boolean;
  hasErrorOnChange: boolean;
  editErrorText: string;
  passwordErrorText: string;
};

class Profile extends React.Component<IUserProfileProps, IState> {
  public state = {
    userProfile: {} as IUserProfile,
    profileEditSuccess: false,
    passwordChangeSuccess: false,
    hasErrorOnEdit: false,
    hasErrorOnChange: false,
    editErrorText: '',
    passwordErrorText: ''
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

  public handleClose = () => {
    this.setState({ profileEditSuccess: false, passwordChangeSuccess: false });
  };

  public render() {
    const { classes } = this.props;
    return (
      <div className="Main">
        <Grid className={classes.root} container>
          <Typography variant="h5" gutterBottom>
            Edit profile
          </Typography>
          <form className={classes.form} autoComplete="off" onSubmit={event => this.handleProfileEditSubmit(event, this)}>
          <FormControl fullWidth={true}>
            <TextField name="username" label="Username" onChange={this.handleProfileChange} value={this.state.userProfile.username || ''} required/>
            <FormHelperText className={classes.userNameNotice}>If you change your username, please make sure that you remember it, since it is used to login.</FormHelperText>
            <TextField name="firstName" label="First name" onChange={this.handleProfileChange} value={this.state.userProfile.firstName || ''} required />
            <TextField name="lastName" label="Last name" onChange={this.handleProfileChange} value={this.state.userProfile.lastName || ''} required />
            <TextField name="email" type="email" label="Email" onChange={this.handleProfileChange} value={this.state.userProfile.email  || ''} required />
            <Button variant="contained" color="primary" className="button" type="submit">Save</Button>
            {this.state.hasErrorOnEdit && <FormHelperText>{this.state.editErrorText}</FormHelperText>}
            {this.state.profileEditSuccess && 
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={this.state.profileEditSuccess}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message={"Profile edited successfully!"}
                action={
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleClose}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                }
                />
              }
          </FormControl>
          </form>
        </Grid>
        <Divider />
        <Grid className={classes.changePasswordGrid} container>
          <Typography variant="h5" gutterBottom>
            Change password
          </Typography>
          <form className={classes.form} autoComplete="off" onSubmit={event => this.handlePasswordChangeSubmit(event, this)}>
          <FormControl fullWidth={true}>
            <TextField name="currentPassword" label="Current password" type="password" onChange={this.handleProfileChange} value={this.state.userProfile.currentPassword || ''} required />
            <TextField name="newPassword"label="New password" type="password" onChange={this.handleProfileChange} value={this.state.userProfile.newPassword || ''} required />
            <TextField name="newPasswordAgain" label="New password again" type="password" onChange={this.handleProfileChange} value={this.state.userProfile.newPasswordAgain || ''} required />
            <Button variant="contained" color="primary" className="button" type="submit">Change</Button>
            {this.state.hasErrorOnChange && <FormHelperText>{this.state.passwordErrorText}</FormHelperText>}
            {this.state.passwordChangeSuccess && 
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={this.state.passwordChangeSuccess}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message={"Password changed successfully!"}
                action={
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleClose}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                }
                />
              }
          </FormControl>
          </form>
        </Grid>
      </div>
    );
  }

  private handleProfileChange = (event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    const object = this.state.userProfile;
    object[e.target.name] = e.target.value;
    this.setState({userProfile: object} as any);
  }

  private handleProfileEditSubmit(event: any, caller: Profile) {
    event.preventDefault();
    const username = this.state.userProfile.username as string;
    const firstName = this.state.userProfile.firstName as string;
    const lastName = this.state.userProfile.lastName as string;
    const email = this.state.userProfile.email as string;
    caller.apiService.editProfile(username, firstName, lastName, email).then(ok =>
    {
      if (ok) {
        this.setState({
          profileEditSuccess: true,
          editErrorText: ''
        })
      } else {
        this.setState({
          hasErrorOnEdit: true,
          editErrorText: "Save was not successful. Try again."
        });
      }
    })
  }

  private handlePasswordChangeSubmit(event: any, caller: Profile) {
    event.preventDefault();
    const password = this.state.userProfile.currentPassword as string;
    const newPassword1 = this.state.userProfile.newPassword as string;
    const newPassword2 = this.state.userProfile.newPasswordAgain as string;
    if (newPassword1 !== newPassword2) {
      this.setState({
        hasErrorOnChange: true,
        passwordErrorText: "New passwords do not match. Try again."
      });
    } else {
      caller.apiService.editPassword(password, newPassword1, newPassword2).then(ok =>
      {
        if (ok) {
          this.setState({
            passwordChangeSuccess: true,
            passwordErrorText: ""
          })
        } else {
          this.setState({
            hasErrorOnChange: true,
            passwordErrorText: "Save was not successful. Try again."
          });
        }
      })
    }
  }

}

export default withStyles(styles, { withTheme: true })(Profile);
