import './App.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Route, Switch } from 'react-router-dom'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import ConsumerMain from './views/ConsumerMain';
import ConsumerServices from './views/consumer/Services';
import CreateNewRequest from './views/consumer/CreateNewRequest';
import Main from './views/Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MyRequests from './views/consumer/MyRequests';
import Profile from './views/Profile';
import ResponsiveDrawer from './components/NavBar'
import SXCustomTheme from './components/Theme';
import ServiceOffer from './views/consumer/ServiceOffer';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  }
});

interface IAppProps extends WithStyles<typeof styles> {
}

class App extends React.Component<IAppProps> {
  public static contextTypes = {
    router: PropTypes.object
  };

  public render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={SXCustomTheme}>
        <div className="App">
          <ResponsiveDrawer title={this.findComponentTitle()} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route title="Home" exact path='/' component={Main}/>
              <Route title="Profile" exact path='/profile' component={Profile}/>
              <Route title="I need something"exact path='/consumer' component={ConsumerMain}/>
              <Route title="Available services" path='/consumer/available_services' component={ConsumerServices}/>
              <Route title="Service offer" path='/consumer/serviceoffer/:id' component={ServiceOffer}/>
              <Route title="My requests" path='/consumer/my_requests' component={MyRequests}/>
              <Route title="Create new request" path='/consumer/create_request' component={CreateNewRequest}/>
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }

  private findComponentTitle = () => {
    switch (this.context.router.route.location.pathname) {
      case '/':
        return 'Home';
      case '/profile':
        return 'Profile';
      case '/consumer':
        return 'Consumer main';
      case '/consumer/available_services':
        return 'Available services';
      case '/consumer/my_requests':
        return 'My requests';
      case '/consumer/create_request':
        return 'Create new request';
      case '/consumer/serviceoffer/:id':
        return 'Service offer';
      default:
        return 'Page not found';
    }
  }
}

export default withStyles(styles, { withTheme: true })(App);

