import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    }
});

interface IConsumerServicesProps extends WithStyles<typeof styles> {
}

class ConsumerServices extends React.Component<IConsumerServicesProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {[0, 1, 2, 3].map(value => (
              <ListItem key={value} dense button>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`Line item ${value + 1}`} secondary="Jan 9, 2014" />
              </ListItem>
            ))}
          </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ConsumerServices);