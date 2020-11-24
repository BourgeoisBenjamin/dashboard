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
import queryString from "query-string";

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
        let params = queryString.parse(window.location.search);

        this.setState({
            sendingRequest: true
        });
        this.forgotPassword.reset({
            uuid: params.uuid,
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
                <SuccessDialog onClose={this.handleSuccessMessageClose} text="Password reset !" open={this.state.successMessageOpen} />
                <ErrorDialog onClose={this.handleErrorMessageClose} text="Cannot reset your password" open={this.state.errorMessageOpen} />
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
                <div className="back-home">
                    <p><strong onClick={this.returnToHome}>Back to home</strong></p>
                </div>
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
        this.returnToHome()
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