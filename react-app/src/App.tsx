import './App.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Route, Switch } from 'react-router-dom'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import ConsumerMain from './views/ConsumerMain';
import ConsumerServices from './views/consumer/Services';
import Main from './views/Main';
import ResponsiveDrawer from './components/NavBar'
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
      <div className="App">
        <ResponsiveDrawer title={this.context.router.route.location.pathname} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route title="Home" exact path='/' component={Main}/>
            <Route title="Consumer main"exact path='/consumer' component={ConsumerMain}/>
            <Route title="Available services" path='/consumer/available_services' component={ConsumerServices}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

