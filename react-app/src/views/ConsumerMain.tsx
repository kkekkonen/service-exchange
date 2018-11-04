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

interface IConsumerMainProps extends WithStyles<typeof styles> {
}

class ConsumerMain extends React.Component<IConsumerMainProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.root} container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom align="center">
              I need something
            </Typography>
          </Grid>
          <Grid item>
            <Button href="#/consumer/available_services" variant="contained" color="primary" className="button">
              Available services
            </Button>
          </Grid>
          <Grid item>
            <Button href="#/consumer/my_requests" variant="contained" color="primary" className="button">
              My requests
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ConsumerMain);