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
        localStorage.setItem('isConnectedViaTiers', 'false');
    }

    render() {
        return (
            <div id="login-module">
                <div class="content">
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

export default Login;