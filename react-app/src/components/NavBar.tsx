import * as React from 'react';

import { RouteComponentProps, withRouter } from "react-router-dom";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../services/apiservice'
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Drawer from '@material-ui/core/Drawer';
import ExitToApp from '@material-ui/icons/ExitToApp';
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
    marginLeft: 'auto',
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
  showBackButton: boolean;
};

interface IResponsiveDrawerProps extends WithStyles<typeof styles> {
  title: string;
}

class ResponsiveDrawer extends React.Component<IResponsiveDrawerProps & RouteComponentProps, IState> {
    public state = {
      mobileOpen: false,
      showBackButton: false
    };

    private apiService: ApiService;
    public constructor(props: IResponsiveDrawerProps & RouteComponentProps) {
      super(props);
      this.apiService = new ApiService();

      this.props.history.listen((location, action) => {
        console.log("on route change");
        this.checkShowBackButton();
      });
      this.checkShowBackButton();
    }
  
    public handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    public handleNavigateBack = () => {
      this.props.history.goBack();
    };

    public handleLogoutButton = () => {
      this.apiService.logoutLoggedUser();
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
            <ListItem button component="a" href="#/consumer/accepted_services">
                <ListItemIcon><DoneAllIcon /></ListItemIcon>
                <ListItemText primary="Accepted services" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListSubheader component="div">I provide something</ListSubheader>
            <ListItem button component="a" href="#/provider/open_requests">
                <ListItemIcon><FeedbackIcon /></ListItemIcon>
                <ListItemText primary="Open requests" />
            </ListItem>
            <ListItem button component="a" href="#/provider/my_service_offers">
                <ListItemIcon><RoomServiceIcon /></ListItemIcon>
                <ListItemText primary="My services" />
            </ListItem>
            <ListItem button component="a" href="#/provider/my_offers">
                <ListItemIcon><SupervisorAccount /></ListItemIcon>
                <ListItemText primary="My offers" />
            </ListItem>
            <ListItem button component="a" href="#/provider/accepted_services">
                <ListItemIcon><DoneAllIcon /></ListItemIcon>
                <ListItemText primary="Accepted services" />
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
              {this.state.showBackButton === true &&
                <IconButton color="inherit" aria-label="Back" onClick={this.handleNavigateBack}>
                  <ArrowBackIcon />
                </IconButton>
              }
              <Typography variant="h6" color="inherit" noWrap>
                {this.findComponentTitle()}
              </Typography>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
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

    private checkShowBackButton = () => {
      const pathname = this.props.location.pathname.replace(/\d+/g, '');
      switch (pathname) {
        case '/':
          this.setState({
            showBackButton: false
          });
          break;
        case '/profile':
          this.setState({
            showBackButton: true
          });
          break;
        case '/publicprofile/':
          this.setState({
            showBackButton: true
          });
          break;
        case '/consumer':
          this.setState({
            showBackButton: true
          });
          break;
        case '/consumer/available_services':
          this.setState({
            showBackButton: true
          });
          break;
        case '/consumer/my_requests':
          this.setState({
            showBackButton: true
          });
          break;
        case '/request/':
          this.setState({
            showBackButton: true
          });
          break;
        case '/provider/request/':
          this.setState({
            showBackButton: true
          });
          break;
        case '/consumer/accepted_services':
          this.setState({
            showBackButton: true
          });
          break;
        case '/consumer/create_request':
          this.setState({
            showBackButton: true
          });
          break;
        case '/consumer/serviceoffer/':
          this.setState({
            showBackButton: true
          });
          break;
        case '/consumer/service/':
          this.setState({
            showBackButton: true
          });
          break;
        case '/provider/service/':
          this.setState({
            showBackButton: true
          });
          break;
        case '/provider':
          this.setState({
            showBackButton: true
          });
          break;
        case '/provider/my_service_offers':
          this.setState({
            showBackButton: true
          });
          break;
        case '/provider/my_offers':
          this.setState({
            showBackButton: true
          });
          break;
        case '/provider/accepted_services':
          this.setState({
            showBackButton: true
          });
          break;
        case '/provider/open_requests':
          this.setState({
            showBackButton: true
          });
          break;
        default:
          this.setState({
            showBackButton: false
          });
          break;
      }
    }

    private findComponentTitle = () => {
      const pathname = this.props.location.pathname.replace(/\d+/g, '');
      switch (pathname) {
        case '/':
          return 'Home';
        case '/profile':
          return 'Profile';
        case '/publicprofile/':
          return 'Profile';
        case '/consumer':
          return 'I need something';
        case '/consumer/available_services':
          return 'Available services';
        case '/consumer/my_requests':
          return 'My requests';
        case '/request/':
          return 'My requests';
        case '/consumer/accepted_services':
          return 'My accepted services';
        case '/consumer/create_request':
          return 'Create new request';
        case '/consumer/serviceoffer/':
          return 'Available services';
        case '/consumer/service/':
          return 'My accepted services';
        case '/provider/service/':
          return 'My accepted services';
        case '/provider':
          return 'I provide something';
        case '/provider/my_service_offers':
          return 'My service offers';
        case '/provider/my_offers':
          return 'My offers';
        case '/provider/accepted_services':
          return 'My accepted services';
        case '/provider/open_requests':
          return 'Open requests';
        case '/provider/request/':
          return 'Open requests';
        default:
          return 'Page not found';
      }
    }
  }
  
  export default withRouter(withStyles(styles, { withTheme: true })(ResponsiveDrawer));