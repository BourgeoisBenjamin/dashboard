import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './module/home/Home';
import Account from './module/account/Account';
import Login from './module/login/Login';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <h2>Welcome to React Router Tutorial</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Login </Link></li>
                <li><Link to={'/account'} className="nav-link">Account</Link></li>
                <li><Link to={'/home'} className="nav-link">Home</Link></li>
              </ul>
            </nav>
            <hr />
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
