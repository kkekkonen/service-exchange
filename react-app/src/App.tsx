import './App.css';

import * as React from 'react';

import { Route, Switch } from 'react-router-dom'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import ConsumerMain from './views/ConsumerMain';
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
  public render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <ResponsiveDrawer title="TODO: Pass current router view title here" />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/consumer' component={ConsumerMain}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

