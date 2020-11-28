import React, { Component } from 'react';
import './SignUp.css'
import RegisterService from "../../core/services/register/RegisterService";
import history from "../../history";
import EmailInput from "../../shared/components/inputs/EmailInput";
import PasswordInput from "../../shared/components/inputs/PasswordInput";
import UsernameInput from "../../shared/components/inputs/UsernameInput";
import BasicButton from "../../shared/components/buttons/BasicButton";
import SuccessDialog from "../../shared/components/dialogs/SuccessDialog";
import ErrorDialog from "../../shared/components/dialogs/ErrorDialog";

class SignUp extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('JWTToken') !== null) {
            history.push('/home');
        }

        document.title = 'Dashboard - Sign up';

        this.registerService = new RegisterService();

        this.state = {
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
            successMessageOpen: false,
            errorMessageOpen: false,
            sendingRequest: false
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
        this.setState({
            sendingRequest: true
        });
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
            <div id="sign-up-module">
                <SuccessDialog onClose={this.handleSuccessMessageClose} text="Account registered !" open={this.state.successMessageOpen} />
                <ErrorDialog onClose={this.handleErrorMessageClose} text="Cannot registered your account" open={this.state.errorMessageOpen} />
                <div class="title">
                    <p>Inscription</p>
                </div>
                <div class="register-form">
                    <div class="username-input input">
                        <UsernameInput name="Username" labelWidth={80} onChange={this.handleUsernameChange} value={this.state.username} />
                    </div>
                    <div class="email-input input">
                        <EmailInput name="Email" labelWidth={70} onChange={this.handleEmailChange} value={this.state.email} />
                    </div>
                    <div class="password-input input">
                        <PasswordInput name="Password" labelWidth={70} onChange={this.handlePasswordChange} value={this.state.password} />
                    </div>
                    <div class="password-confirmation-input input">
                        <PasswordInput name="Confirm password" labelWidth={150} onChange={this.handleConfirmPasswordChange} value={this.state.confirmPassword} />
                    </div>
                </div>
                <BasicButton onClick={this.onClickRegister} name="Register" display={this.state.sendingRequest} loaderSize={50} />
                <div class="already-register">
                    <p>Already register ? Sign in <strong onClick={this.returnToHomeClick}>here</strong></p>
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
}

export default SignUp;