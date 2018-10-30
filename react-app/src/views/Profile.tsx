import * as React from 'react';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class Profile extends React.Component {
  public render() {
    return (
      <div className="Main">
        <Grid container>
          <FormControl fullWidth={true}>
            <TextField label="Username" />
            <TextField label="First name" />
            <TextField label="Last name" />
            <TextField label="Email" />
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

export default Profile;