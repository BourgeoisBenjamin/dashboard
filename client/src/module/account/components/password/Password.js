import React, {Component} from "react";
import './Password.css'
import BasicButton from "../../../../shared/components/buttons/BasicButton";
import PasswordInput from "../../../../shared/components/inputs/PasswordInput";
import SuccessDialog from "../../../../shared/components/dialogs/SuccessDialog";
import ErrorDialog from "../../../../shared/components/dialogs/ErrorDialog";
import AccountService from "../../../../core/services/account/AccountService";

class Password extends Component
{
    constructor(props)
    {
        super(props);

        this.service = new AccountService();

        this.state = {
            sendingPassword: false,
            oldPassword: '',
            newPassword: '',
            confirmationNewPassword: '',
            displaySuccessDialog: false,
            textSuccessDialog: '',
            displayErrorDialog: false,
            textErrorDialog: '',
        };

        this.props.parentState.setServicesIsSelected(false);
        this.props.parentState.setInformationIsSelected(false);
        this.props.parentState.setPasswordIsSelected(true);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.handleOnDialogSuccessClose = this.handleOnDialogSuccessClose.bind(this);
        this.handleOnDialogErrorClose = this.handleOnDialogErrorClose.bind(this);
    }

    onClickUpdate()
    {
        if (this.state.newPassword !== this.state.confirmationNewPassword) {
            this.displayDialog('error', 'New password and confirmation new password doest not match');
            return;
        }
        this.displayLoaderButtonUpdate(true);

        const data = {
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword
        }

        this.service.changePassword(data, () => {
            this.displayLoaderButtonUpdate(false);
            this.displayDialog('success', 'Password change');
            this.resetInput();
        }, () => {
            this.displayLoaderButtonUpdate(false);
            this.displayDialog('error', 'Error when changing password');
        })
    }

    render() {
        return (
            <div id="password-account">
                <div className="element">
                    <div className="first-column">
                        <div className="title">
                            <p>Password</p>
                        </div>
                        <div className="description">
                            <p>Change your password</p>
                        </div>
                    </div>
                    <div className="second-column">
                        <div className="input">
                            <PasswordInput name="Old password" labelWidth={100} onChange={ (e) => {this.setState({oldPassword: e.target.value})}} />
                        </div>
                        <div className="input">
                            <PasswordInput name="New password" labelWidth={120} onChange={ (e) => {this.setState({newPassword: e.target.value})} } />
                        </div>
                        <div className="input">
                            <PasswordInput name="Confirm new password" labelWidth={200} onChange={ (e) => {this.setState({confirmationNewPassword: e.target.value})} } />
                        </div>
                        <BasicButton name={'Update'} loaderSize={50} onClick={this.onClickUpdate} display={this.state.sendingPassword} />
                    </div>
                </div>

                <SuccessDialog open={this.state.displaySuccessDialog} onClose={this.handleOnDialogSuccessClose} text={this.state.textSuccessDialog}  />
                <ErrorDialog open={this.state.displayErrorDialog} onClose={this.handleOnDialogErrorClose} text={this.state.textErrorDialog} />
            </div>
        );
    }

    handleOnDialogSuccessClose()
    {
        this.removeDialog('success');
    }

    handleOnDialogErrorClose()
    {
        this.removeDialog('error');
    }

    displayDialog(type, text)
    {
        if (type === 'error') {
            this.setState({
                displayErrorDialog: true,
                textErrorDialog: text
            });
        } else {
            this.setState({
                displaySuccessDialog: true,
                textErrorDialog: text
            });
        }
    }

    removeDialog(type)
    {
        if (type === 'error') {
            this.setState({
                displayErrorDialog: false
            });
        } else {
            this.setState({
                displaySuccessDialog: false
            });
        }
    }

    displayLoaderButtonUpdate(display)
    {
        this.setState({
            sendingPassword: display
        });
    }

    resetInput()
    {
        this.setState({
            oldPassword: '',
            newPassword: '',
            confirmationNewPassword: '',
        });
    }
}

export default Password;