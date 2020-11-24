import React, { Component } from 'react';
import './ResetPassword.css'
import { Alert } from '@material-ui/lab'
import Snackbar from "@material-ui/core/Snackbar";
import history from "../../history";
import PasswordInput from "../../shared/components/inputs/PasswordInput";
import BasicButton from "../../shared/components/buttons/BasicButton";
import SuccessDialog from "../../shared/components/dialogs/SuccessDialog";
import ErrorDialog from "../../shared/components/dialogs/ErrorDialog";
import {Error} from "@material-ui/icons";
import ForgotPasswordService from "../../core/services/forgot-password/ForgotPassword";

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('JWTToken') !== null) {
            history.push('/home');
        }

        this.forgotPassword = new ForgotPasswordService();

        this.state = {
            password: '',
            confirmPassword: '',
            successMessageOpen: false,
            errorMessageOpen: false,
            sendingRequest: false
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSuccessMessageClose = this.handleSuccessMessageClose.bind(this);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
    }

    onClickReset = () =>
    {
        this.setState({
            sendingRequest: true
        });
        this.forgotPassword.reset({
            password: this.state.password
        }, (res) => {
            this.setState({
                password: '',
                confirmPassword: '',
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
            <div id="reset-password-module">
                <SuccessDialog onClose={this.handleSuccessMessageClose} text="Account registered !" open={this.state.successMessageOpen} />
                <ErrorDialog onClose={this.handleErrorMessageClose} text="Cannot registered your account" open={this.state.errorMessageOpen} />
                <div class="title">
                    <p>Reset your password</p>
                </div>
                <div class="reset-form">

                    <div class="password-input input">
                        <PasswordInput name="New password" labelWidth={70} onChange={this.handlePasswordChange} value={this.state.password} />
                    </div>
                    <div class="password-confirmation-input input">
                        <PasswordInput name="Confirm new password" labelWidth={150} onChange={this.handleConfirmPasswordChange} value={this.state.confirmPassword} />
                    </div>
                </div>
                <BasicButton onClick={this.onClickReset} name="Reset" display={this.state.sendingRequest} loaderSize={50} />
            </div>
        );
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

    returnToHome()
    {
        history.push('/')
    }
}

export default ResetPassword;