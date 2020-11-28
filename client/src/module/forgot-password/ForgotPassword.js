import React, { Component } from 'react';
import './ForgotPassword.css'
import history from "../../history";
import EmailInput from "../../shared/components/inputs/EmailInput";
import UsernameInput from "../../shared/components/inputs/UsernameInput";
import BasicButton from "../../shared/components/buttons/BasicButton";
import SuccessDialog from "../../shared/components/dialogs/SuccessDialog";
import ErrorDialog from "../../shared/components/dialogs/ErrorDialog";
import ForgotPasswordService from "../../core/services/forgot-password/ForgotPassword";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('JWTToken') !== null) {
            history.push('/home');
        }

        this.forgotPassword = new ForgotPasswordService();

        this.state = {
            username: '',
            email: '',
            successMessageOpen: false,
            errorMessageOpen: false,
            sendingRequest: false,
            open: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSuccessMessageClose = this.handleSuccessMessageClose.bind(this);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleClose()
    {
        this.setState({
            open: false
        })
    }

    onClick()
    {
        this.setState({
            open: true
        })
    }



    onClickForgot = () =>
    {
        this.setState({
            sendingRequest: true
        });
        this.forgotPassword.forgot({
            username: this.state.username,
            email: this.state.email
        }, (res) => {
            this.setState({
                username: '',
                email: '',
                successMessageOpen: true,
                sendingRequest: false
            })
        }, (res) => {
            this.setState({
                errorMessageOpen: true,
                sendingRequest: false
            })
        })
    }

    render() {
        return (
            <div id="forgot-password-module">
                <button  aria-controls="simple-menu" aria-haspopup="true" onClick={this.onClick}>Lol</button>
                <Menu
                    id="simple-menu"
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
                <SuccessDialog onClose={this.handleSuccessMessageClose} text="Reset link sent to your email !" open={this.state.successMessageOpen} />
                <ErrorDialog onClose={this.handleErrorMessageClose} text="Cannot reset your password" open={this.state.errorMessageOpen} />
                <div class="title">
                    <p>Forgot password ?</p>
                </div>
                <div class="forgot-form">
                    <div class="username-input input">
                        <UsernameInput name="Username" labelWidth={80} onChange={this.handleUsernameChange} value={this.state.username} />
                    </div>
                    <div class="email-input input">
                        <EmailInput name="Email" labelWidth={70} onChange={this.handleEmailChange} value={this.state.email} />
                    </div>
                </div>
                <BasicButton onClick={this.onClickForgot} name="Send reset link" display={this.state.sendingRequest} loaderSize={50} />
                <div class="back-home">
                    <p><strong onClick={this.returnToHomeClick}>Back to home</strong></p>
                </div>
            </div>
        );
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
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
}

export default ForgotPassword;