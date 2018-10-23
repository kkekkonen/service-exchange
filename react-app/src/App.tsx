import './App.css';

import * as React from 'react';

import { Route, Switch } from 'react-router-dom'

import ConsumerMain from './views/ConsumerMain';
import Main from './views/Main';
import ResponsiveDrawer from './components/NavBar'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ResponsiveDrawer title="TODO: Pass current router view title here" />
        <main>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/consumer' component={ConsumerMain}/>
        </Switch>
        </main>
      </div>
    );
  }
}

export default App;
