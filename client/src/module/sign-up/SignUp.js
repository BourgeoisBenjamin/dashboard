import React, { Component } from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import './SignUp.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';

class SignUp extends Component {

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
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="button-sign-up">
                    <button>Register</button>
                </div>
            </div>
        );
    }
}

export default SignUp;