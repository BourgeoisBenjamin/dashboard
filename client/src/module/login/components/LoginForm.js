import React, { Component } from 'react';
import './LoginForm.css';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

export class LoginForm extends Component {
    render() {
        return (
            <div id="login-form">
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
                        />
                    </FormControl>
                </div>
                <div class="button-login">
                    <button>Login</button>
                </div>
            </div>
        );
    }
}
