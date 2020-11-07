import React, { Component } from 'react';
import './Login.css';
import { LoginForm } from './components/LoginForm'

class Login extends Component {
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