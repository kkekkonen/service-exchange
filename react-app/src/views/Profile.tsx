import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../services/apiservice'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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
};

class Profile extends React.Component<IUserProfileProps, IState> {
  public state = {
    userProfile: {} as IUserProfile,
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

  public _handleChangeEvent(val: string) {
    return val;
  }

  public render() {
    console.log('render', this.state)
    const { classes } = this.props;
    return (
      <div className="Main">
        <Grid className={classes.root} container>
          <FormControl fullWidth={true}>
            <TextField
              label="Username"
              value={this.state.userProfile.username}
              defaultValue=" " 
              onChange={()=>{this._handleChangeEvent(this.state.userProfile.username)}}
            />
            <TextField label="First name" value={this.state.userProfile.firstName} defaultValue=" " />
            <TextField label="Last name" value={this.state.userProfile.lastName} defaultValue=" " />
            <TextField label="Email" value={this.state.userProfile.email} defaultValue=" " />
            <TextField label="Password" type="password" />
            <TextField label="Password again" type="password" />
            <Button variant="contained" color="primary" className="button">Save</Button>
          </FormControl>
        </Grid>
        <Divider />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Profile);