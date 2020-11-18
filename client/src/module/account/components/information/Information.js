import React, {Component} from "react";
import './Information.css'
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccountModel from "../../../../core/models/account/AccountModel";
import AccountService from "../../../../core/services/account/AccountService";
import { AiFillCheckCircle } from 'react-icons/ai'
import ClipLoader from "react-spinners/ClipLoader";
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

class Information extends Component
{
    service = new AccountService();
    model = new AccountModel();

    constructor(props)
    {
        super(props);

        this.state = {
            username: '',
            email: '',
            activateEmail: false,
            sendingUpdateInfo: false,
            sendingSendConfirmationEmail: false,
            sendingDeleteAccount: false,
            successMessageOpen: false,
            successMessageText: 'Account registered !'
        };

        this.props.parentState.setServicesIsSelected(false);
        this.props.parentState.setInformationIsSelected(true);
        this.props.parentState.setPasswordIsSelected(false);
        this.handleSendConfirmationEmail = this.handleSendConfirmationEmail.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.onClickUpdateInfo = this.onClickUpdateInfo.bind(this);
        this.handleSuccessMessageClose = this.handleSuccessMessageClose.bind(this);
        this.loadData();
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    updateData()
    {
        this.setState({
            username: this.service.getUsername(),
            email: this.service.getEmail(),
            activateEmail: this.service.getActivateEmail()
        });
    }

    loadData()
    {
        this.service.getInfos(() => {
            this.updateData();
        }, () => {
        });
    }

    handleSendConfirmationEmail()
    {
        this.setState({
            sendingSendConfirmationEmail: true
        });

        this.service.resendEmail(() => {
            this.setState({
                sendingSendConfirmationEmail: false,
                successMessageOpen: true,
                successMessageText: 'Confirmation email send !'
            });
        }, () => {
        });
    }

    onClickUpdateInfo()
    {
        console.log('send');
        this.setState({
            sendingUpdateInfo: true
        });

        const data = {
            email: this.state.email,
            username: this.state.username
        };

        this.service.updateUserInfos(data,() => {
            this.setState({
                sendingUpdateInfo: false,
                successMessageOpen: true,
                successMessageText: 'Infos updated !'
            });
        }, () => {
        });
    }

    handleSuccessMessageClose()
    {
        this.setState({
            successMessageOpen: false,
        });
    }

    render() {
        return (
            <div id="information-account">
                {
                    /*FIRST ELEMENT*/
                }
                <div class="element">
                    <div className="first-column">
                        <div class="title">
                            <p>Email and username</p>
                        </div>
                        <div class="description">
                            <p>Change your email and your username</p>
                        </div>
                    </div>
                    <div className="second-column">
                        <div class="email-input">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start"><MailOutlineIcon/></InputAdornment>}
                                    labelWidth={70}
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </FormControl>
                        </div>
                        <div class="username-input">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start"><PersonOutlineIcon/></InputAdornment>}
                                    labelWidth={100}
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                />
                            </FormControl>
                        </div>
                        <div className="update-button">
                            <button onClick={this.onClickUpdateInfo}>Update</button>
                        </div>
                        <div className="loader"  style={{ display: (this.state.sendingUpdateInfo ? 'block' : 'none')}}>
                            <ClipLoader size="50"/>
                        </div>
                    </div>
                </div>
                {
                    /*SECOND ELEMENT*/
                }
                <div className="element">
                    <div className="first-column">
                        <div className="title">
                            <p>Verify your email</p>
                        </div>
                    </div>
                    <div className="second-column">
                        <div className="email-input">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment
                                        position="start"><MailOutlineIcon/></InputAdornment>}
                                    labelWidth={70}
                                    value={this.state.email}
                                    disabled="disabled"
                                />
                            </FormControl>
                        </div>
                        {this.state.activateEmail ? (
                            <div className="message-email-verify">
                                <AiFillCheckCircle color={'green'} />
                                <p>Your email is verify !</p>
                            </div>
                        ) : (
                            <div className="update-button">
                                <button onClick={this.handleSendConfirmationEmail}>Send confirmation mail</button>
                            </div>
                        )}
                        {!this.state.activateEmail &&
                            <div className="loader loader-confirmation-email"  style={{ display: (this.state.sendingSendConfirmationEmail ? 'block' : 'none')}}>
                                <ClipLoader size="50"/>
                            </div>
                        }
                    </div>
                </div>
                {
                    /*THIRD ELEMENT*/
                }
                <div className="element">
                    <div className="first-column">
                        <div className="title">
                            <p>Delete your account</p>
                        </div>
                        <div className="description">
                            <p>Be careful, this action is irreversible</p>
                        </div>
                    </div>
                    <div className="second-column">
                        <div className="delete-button">
                            <button onClick={this.onClickRegister}>Delete your account</button>
                        </div>
                        <div className="loader loader-confirmation-email" style={{ display: (this.state.sendingDeleteAccount ? 'block' : 'none')}}>
                            <ClipLoader size="50"/>
                        </div>
                    </div>
                </div>

                <Snackbar open={this.state.successMessageOpen} onClose={this.handleSuccessMessageClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <Alert onClose={this.handleSuccessMessageClose} severity="success" variant="filled">
                        {this.state.successMessageText}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default Information;