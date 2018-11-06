import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
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
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    margin: 0
  },
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

    public handleLogoutButton = () => {
      // TODO
    }
  
    public render() {
      const { classes } = this.props;
  
      const drawer = (
        <div>
          <div className={classes.toolbar + ' ' + classes.center}>
            <Typography className={classes.logo} variant="h4" gutterBottom align="center">
              Favor.io
            </Typography>
          </div>
          <Divider />
          <List>
            <ListItem button component="a" href="#/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component="a" href="#/profile">
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="My profile" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListSubheader component="div">I need something</ListSubheader>
            <ListItem button component="a" href="#/consumer/available_services">
                <ListItemIcon><RoomServiceIcon /></ListItemIcon>
                <ListItemText primary="Available services" />
            </ListItem>
            <ListItem button component="a" href="#/consumer/my_requests">
                <ListItemIcon><FeedbackIcon /></ListItemIcon>
                <ListItemText primary="My requests" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListSubheader component="div">I provide something</ListSubheader>
            <ListItem button>
                <ListItemIcon><FeedbackIcon /></ListItemIcon>
                <ListItemText primary="Open requests" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><RoomServiceIcon /></ListItemIcon>
                <ListItemText primary="My services" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><SupervisorAccount /></ListItemIcon>
                <ListItemText primary="My offers" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={this.handleLogoutButton}>
                <ListItemIcon><ExitToApp /></ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItem>
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