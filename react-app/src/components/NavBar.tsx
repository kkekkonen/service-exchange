import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import createStyles from '@material-ui/core/styles/createStyles';

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
  root: {
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

interface IState {
  mobileOpen: boolean;
};

interface IResponsiveDrawerProps extends WithStyles<typeof styles> {
  title: string;
}

class ResponsiveDrawer extends React.Component<IResponsiveDrawerProps, IState> { 
    public state = {
      mobileOpen: false,
    };
  
    public handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
  
    public render() {
      const { classes } = this.props;
  
      const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );
  
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swap with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </div>
      );
    }
  }
  
  export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);