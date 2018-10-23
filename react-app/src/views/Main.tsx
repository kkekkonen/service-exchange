import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    }
});

interface IMainProps extends WithStyles<typeof styles> {
}

class Main extends React.Component<IMainProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className="Main">
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            Choose your role.
          </Grid>
          <Grid item xs={12}>
            <Button href="#/consumer" variant="contained" color="primary" className="button">
              I need something
            </Button>
          </Grid>
          <Grid item xs={12}>
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