import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from './module/home/Home';
import Account from './module/account/Account';
import Login from './module/login/Login';
import SignUp from './module/sign-up/SignUp';
import Header from './shared/components/header/Header'
import history from './history';

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div>
              <Header></Header>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/sign-up' component={SignUp} />
              <Route path='/account' component={Account} />
              <Route path='/home' component={Home} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
