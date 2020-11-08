import React, { Component } from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import './SignUp.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import RegisterService from "../../core/services/register/RegisterService";
import { Alert } from '@material-ui/lab'
import Snackbar from "@material-ui/core/Snackbar";
import history from "../../history";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.registerService = new RegisterService();

        this.state = {
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
            successMessageOpen: false,
            errorMessageOpen: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSuccessMessageClose = this.handleSuccessMessageClose.bind(this);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
    }

    onClickRegister = () =>
    {
        this.registerService.register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }, (res) => {
            this.setState({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                successMessageOpen: true
            })
        }, (res) => {
            this.setState({
                errorMessageOpen: true
            })
        })
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleConfirmPasswordChange(e) {
        this.setState({confirmPassword: e.target.value});
    }

    handleSuccessMessageClose(e) {
        this.setState({successMessageOpen: false});
        this.returnToHomeClick()
    }

    handleErrorMessageClose(e) {
        this.setState({errorMessageOpen: false});
    }

    returnToHomeClick()
    {
        history.push('/')
    }

    render() {
        return (
            <div id="sign-up-module">
                <Snackbar open={this.state.successMessageOpen} autoHideDuration={6000} onClose={this.handleSuccessMessageClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <Alert onClose={this.handleSuccessMessageClose} severity="success" variant="filled">
                        Account registered !
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.errorMessageOpen} autoHideDuration={6000} onClose={this.handleErrorMessageClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <Alert onClose={this.handleErrorMessageClose} severity="error" variant="filled">
                        Cannot registered your account
                    </Alert>
                </Snackbar>
                <div class="title">
                    <p>Inscription</p>
                </div>
                <div class="register-form">
                    <div class="username-input input">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><PersonOutlineIcon/></InputAdornment>}
                                labelWidth={80}
                                onChange={this.handleUsernameChange}
                                value={this.state.username}
                            />
                        </FormControl>
                    </div>
                    <div class="email-input input">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><MailOutlineIcon/></InputAdornment>}
                                labelWidth={70}
                                onChange={this.handleEmailChange}
                                value={this.state.email}
                            />
                        </FormControl>
                    </div>
                    <div class="password-input input">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><LockIcon/></InputAdornment>}
                                labelWidth={70}
                                type="password"
                                onChange={this.handlePasswordChange}
                                value={this.state.password}
                            />
                        </FormControl>
                    </div>
                    <div class="password-confirmation-input input">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Confirm password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><LockIcon/></InputAdornment>}
                                labelWidth={150}
                                type="password"
                                onChange={this.handleConfirmPasswordChange}
                                value={this.state.confirmPassword}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="button-sign-up">
                    <button onClick={this.onClickRegister}>Register</button>
                </div>
                <div class="already-register">
                    <p>Already register ? Sign in <strong onClick={this.returnToHomeClick}>here</strong></p>
                </div>
            </div>
        );
    }
}

export default SignUp;