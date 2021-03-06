import React, { Component } from 'react';
import './Login.css';
import { LoginForm } from './components/LoginForm'
import history from "../../history";

class Login extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('JWTToken') !== null) {
            history.push('/home');
        }

        document.title = 'Dashboard - Login';

        localStorage.setItem('isConnectedViaTiers', 'false');
    }

    render() {
        return (
            <div id="login-module">
                <div className="content">
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

export default Login;