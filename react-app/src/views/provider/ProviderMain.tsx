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

interface IProviderMainProps extends WithStyles<typeof styles> {
}

class ProviderMain extends React.Component<IProviderMainProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.root} container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom align="center">
              I can provide something
            </Typography>
          </Grid>
          <Grid item>
            <Button href="#/provider/open_requests" variant="contained" color="primary" className="button">
              Open requests
            </Button>
          </Grid>
          <Grid item>
            <Button href="#/provider/my_service_offers" variant="contained" color="primary" className="button">
              My services
            </Button>
          </Grid>
          <Grid item>
            <Button href="#/provider/my_offers" variant="contained" color="primary" className="button">
              My offers
            </Button>
          </Grid>
          <Grid item>
            <Button href="#/provider/accepted_services" variant="contained" color="primary" className="button">
              Accepted services
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProviderMain);