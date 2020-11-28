import React, { Component } from 'react';
import './LoginForm.css';
import youtubeImage from '../../../assets/images/youtube.png';
import twitterImage from '../../../assets/images/twitter.png';
import history from '../../../history';
import LoginService from "../../../core/services/login/LoginService";
import OAuthService from "../../../core/services/login/OAuthService";
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import MenuContext from "../../../core/contexts/MenuContext";
import UsernameInput from "../../../shared/components/inputs/UsernameInput";
import PasswordInput from "../../../shared/components/inputs/PasswordInput";
import BasicButton from "../../../shared/components/buttons/BasicButton";

export class LoginForm extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.loginService = new LoginService();
        this.OAuthService = new OAuthService();

        this.state = {
            identifier: '',
            password: '',
            errorMessageOpen: false,
            sendingLoginRequest: false
        };

        this.handleIdentifierChange = this.handleIdentifierChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
    }

    handleIdentifierChange(e) {
        this.setState({identifier: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleErrorMessageClose(e) {
        this.setState({errorMessageOpen: false});
    }

    handleConnectClick = () =>
    {
        this.setState({
            sendingLoginRequest: true
        })
        this.loginService.register({
            identifier: this.state.identifier,
            password: this.state.password
        }, (res) => {
            sessionStorage.setItem('menu', 'block');
            history.push('/home')
            this.context.setShowMenu('block');
            this.context.setConnectedViaTiers(false);
            localStorage.setItem('isConnectedViaTiers', 'false');
        }, (res) => {
            this.setState({
                errorMessageOpen: true,
                sendingLoginRequest: false
            })
        })
    }

    handleSignUpClick = () =>
    {
        history.push('/sign-up')
    }

    handleForgotPasswordClick = () =>
    {
        history.push('/forgot-password')
    }

    handleSignInTwitter = () =>
    {
        this.setState({
            sendingLoginRequest: true
        })
        this.OAuthService.connectOAuth((uuid) => {
            this.OAuthService.connectTwitter(uuid)
        }, (res) => {
            sessionStorage.setItem('menu', 'block');
            history.push('/home')
            this.context.setShowMenu('block');
            this.context.setConnectedViaTiers(true);
            localStorage.setItem('isConnectedViaTiers', 'true');
        }, (res) => {
            this.setState({
                errorMessageOpen: true,
                sendingLoginRequest: false
            })
        })
    }

    handleSignInGoogle = () =>
    {
        this.setState({
            sendingLoginRequest: true
        })
        this.OAuthService.connectOAuth((uuid) => {
            this.OAuthService.connectGoogle(uuid)
        }, (res) => {
            sessionStorage.setItem('menu', 'block');
            history.push('/home')
            this.context.setShowMenu('block');
            this.context.setConnectedViaTiers(true);
            localStorage.setItem('isConnectedViaTiers', 'true');
        }, (res) => {
            this.setState({
                errorMessageOpen: true,
                sendingLoginRequest: false
            })
        })
    }

    render() {
        return (
            <div id="login-form">
                <Snackbar open={this.state.errorMessageOpen} autoHideDuration={6000} onClose={this.handleErrorMessageClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <Alert onClose={this.handleErrorMessageClose} severity="error" variant="filled">
                        Wrong username/password.
                    </Alert>
                </Snackbar>
                <div class="title">
                     <p>Dashboard</p>
                </div>
                <div className="username-input">
                    <UsernameInput onChange={this.handleIdentifierChange} value={this.state.identifier} name="Username or Email" labelWidth={150} />
                </div>
                <div className="password-input">
                    <PasswordInput onChange={this.handlePasswordChange} value={this.state.password} name="Password" labelWidth={80} />
                </div>
                <div className="forgot-password">
                    <p onClick={this.handleForgotPasswordClick}>Forgot your password ?</p>
                </div>
                <BasicButton onClick={this.handleConnectClick} display={this.state.sendingLoginRequest} name="Login" loaderSize={50} />
                <div class="tiers-service-connect">
                    <div class="title">
                        <p>Or with</p>
                    </div>
                    <div class="logos">
                        <div onClick={this.handleSignInTwitter} className="twitter logo">
                            <img src={twitterImage} alt=""/>
                        </div>
                        <div onClick={this.handleSignInGoogle} className="youtube logo">
                            <img src={youtubeImage} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="button-sign-up">
                    <p onClick={this.handleSignUpClick}>Sign up</p>
                </div>
            </div>
        );
    }
}
