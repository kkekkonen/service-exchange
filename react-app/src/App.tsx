import './App.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Route, Switch } from 'react-router-dom'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import ConsumerMain from './views/ConsumerMain';
import ConsumerServices from './views/consumer/Services';
import Main from './views/Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ResponsiveDrawer from './components/NavBar'
import SXCustomTheme from './components/Theme';
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
              <Route title="I need something"exact path='/consumer' component={ConsumerMain}/>
              <Route title="Available services" path='/consumer/available_services' component={ConsumerServices}/>
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
      case '/consumer':
        return 'Consumer main';
      case '/consumer/available_services':
        return 'Available services';
      default:
        return 'Page not found';
    }
  }
}

export default withStyles(styles, { withTheme: true })(App);

