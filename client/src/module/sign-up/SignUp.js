import React, { Component } from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import './SignUp.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import RegisterService from "../../core/services/register/RegisterService";
import { Alert } from '@material-ui/lab'
// import { Alert } from 'reactstrap';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.registerService = new RegisterService();
        this.username = "";
        this.password = "";
        this.email = "";
        this.confirmPassword = "";
    }

    onClickRegister = () =>
    {
        console.log(this.registerService);
        console.log(this.username);
        console.log(this.email);
        console.log(this.password);
        console.log(this.confirmPassword);
        this.registerService.register({
            username: this.username,
            password: this.password,
            email: this.email
        }, (res) => {
            this.username = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
        }, (res) => {
            console.log(res)
        })
    }

    handleUsernameChange = (e) => {
        this.username = e.target.value;
    }

    handleEmailChange = (e) => {
        this.email = e.target.value;
    }

    handlePasswordChange = (e) => {
        this.password = e.target.value;
    }

    handleConfirmPasswordChange = (e) => {
        this.confirmPassword = e.target.value;
    }

    render() {
        return (
            <div id="sign-up-module">
                <Alert severity="success">This is a success alert — check it out!</Alert>
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
                                value={this.username}
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
                                value={this.email}
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
                                value={this.password}
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
                                value={this.confirmPassword}
                            />
                        </FormControl>
                    </div>
                </div>
                <div class="error-message">
                    <p>C'est un message d'erreur</p>
                </div>
                <div className="button-sign-up">
                    <button onClick={this.onClickRegister}>Register</button>
                </div>
            </div>
        );
    }
}

export default SignUp;