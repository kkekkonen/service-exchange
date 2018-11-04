import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%'
    }
});

interface IMainProps extends WithStyles<typeof styles> {
}

class Main extends React.Component<IMainProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.root} container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom align="center">
              Welcome to our platform
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Begin by choosing your role. You can always switch it from the side menu.
            </Typography>
          </Grid>
          <Grid item>
            <Button href="#/consumer" variant="contained" color="primary" className="button">
              I need something
            </Button>
          </Grid>
          <Grid item>
            <Button href="#/consumer" variant="contained" color="primary" className="button">
              I provide something
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);