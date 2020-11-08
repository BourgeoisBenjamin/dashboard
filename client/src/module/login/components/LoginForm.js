import React, { Component } from 'react';
import './LoginForm.css';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import youtubeImage from '../../../assets/images/youtube.png';
import twitterImage from '../../../assets/images/twitter.png';
import history from '../../../history';
import LoginService from "../../../core/services/login/LoginService";
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import MenuContext from "../../../core/contexts/MenuContext";

export class LoginForm extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.loginService = new LoginService();

        this.state = {
            identifier: '',
            password: '',
            errorMessageOpen: false
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
        console.log(this.state);
        this.loginService.register({
            identifier: this.state.identifier,
            password: this.state.password
        }, (res) => {
            sessionStorage.setItem('menu', 'block');
            history.push('/home')
            // this.context.setLimitInUse('lol');
            this.context.setShowMenu('block');
        }, (res) => {
            this.setState({
                errorMessageOpen: true
            })
        })
    }

    handleSignUpClick = () =>
    {
        history.push('/sign-up')
    }

    render() {
        return (
            <div id="login-form">
                <Snackbar open={this.state.errorMessageOpen} autoHideDuration={6000} onClose={this.handleErrorMessageClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <Alert onClose={this.handleErrorMessageClose} severity="error" variant="filled">
                        Failed to register
                    </Alert>
                </Snackbar>
                <div class="title">
                     <p>Dashboard</p>
                </div>
                <div className="username-input">
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Username or Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"><PersonOutlineIcon/></InputAdornment>}
                            labelWidth={150}
                            onChange={this.handleIdentifierChange}
                            value={this.state.identifier}
                        />
                    </FormControl>
                </div>
                <div className="password-input">
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"><LockIcon/></InputAdornment>}
                            labelWidth={80}
                            type="password"
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                        />
                    </FormControl>
                </div>
                <div className="forgot-password">
                    <p>Forgot your password ?</p>
                </div>
                <div class="button-login">
                    <button onClick={this.handleConnectClick}>Login</button>
                </div>
                <div class="tiers-service-connect">
                    <div class="title">
                        <p>Or with</p>
                    </div>
                    <div class="logos">
                        <div className="twitter logo">
                            <img src={twitterImage} alt=""/>
                        </div>
                        <div className="youtube logo">
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
