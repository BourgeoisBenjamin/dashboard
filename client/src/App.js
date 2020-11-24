import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu : 'none',

            setShowMenu: (showMenu) => {
                this.setState({ showMenu: showMenu })
            },
        }
    }

    render() {
        return (
            <Router history={history}>
                <MenuContext.Provider value={ this.state }>
                    <div>
                        <Header></Header>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route exact path='/sign-up' component={SignUp} />
                            <Route exact path='/forgot-password' component={ForgotPassword} />
                            <Route exact path='/reset-password' component={ResetPassword} />
                            <Route path='/account' component={Account} />
                            <Route path='/home' component={Home} />
                            <Route path='/email/verify/:token' component={EmailVerify} />
                        </Switch>
                    </div>
                </MenuContext.Provider>
            </Router>
        );
    }
}

export default App;
