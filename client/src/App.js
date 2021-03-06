import React, { Component } from 'react';
import { Redirect, Router, Switch, Route } from 'react-router-dom';
import Home from './module/home/Home';
import Account from './module/account/Account';
import Login from './module/login/Login';
import SignUp from './module/sign-up/SignUp';
import Header from './shared/components/header/Header'
import history from './history';
import MenuContext from "./core/contexts/MenuContext";
import EmailVerify from "./module/email-verify/EmailVerify";
import ForgotPassword from "./module/forgot-password/ForgotPassword";
import ResetPassword from "./module/reset-password/ResetPassword";
import NotFound from "./module/not-found/NotFound";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu : 'none',
            isConnectedViaTiers: localStorage.getItem('isConnectedViaTiers') === 'true',

            setShowMenu: (showMenu) => {
                this.setState({ showMenu: showMenu })
            },

            setConnectedViaTiers: (connectedViaTiers) => {
                this.setState({ isConnectedViaTiers: connectedViaTiers })
            },
        }
    }

    render() {
        return (
            <Router history={history}>
                <MenuContext.Provider value={ this.state }>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route exact path='/sign-up' component={SignUp} />
                            <Route exact path='/forgot-password' component={ForgotPassword} />
                            <Route exact path='/reset-password' component={ResetPassword} />
                            <Route path='/account' component={Account} />
                            <Route path='/home' component={Home} />
                            <Route path='/email/verify/:token' component={EmailVerify} />
                            <Route path='/404' exact={true} component={NotFound} />
                            <Route path='*' exact={true} render={() => <Redirect to="/404" />} />
                        </Switch>
                    </div>
                </MenuContext.Provider>
            </Router>
        );
    }
}

export default App;
