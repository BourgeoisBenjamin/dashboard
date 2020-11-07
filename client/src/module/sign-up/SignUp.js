import React, { Component } from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import './SignUp.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import RegisterService from "../../core/services/register/RegisterService";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.registerService = new RegisterService();
        this.username = "";
        this.password = "";
        this.email = "";
        this.confirmPassword = "";
    }

    onClickRegister()
    {
        console.log(this.username);
        console.log(this.email);
        console.log(this.password);
        console.log(this.confirmPassword);
        // this.registerService.register({
        //     username: this.username,
        //     password: this.password,
        //     email: this.email
        // }, (res) => {
        //
        // }, (res) => {
        //
        // })
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
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="button-sign-up">
                    <button onClick={this.onClickRegister}>Register</button>
                </div>
            </div>
        );
    }
}

export default SignUp;