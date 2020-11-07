import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './module/home/Home';
import Account from './module/account/Account';
import Login from './module/login/Login';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/account' component={Account} />
              <Route path='/home' component={Home} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
