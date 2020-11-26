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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import history from "../../../../history";
import MenuContext from "../../../../core/contexts/MenuContext";

class Information extends Component
{

    static contextType = MenuContext;

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
            successMessageText: 'Account registered !',
            errorMessageOpen: false,
            errorMessageText: 'Account registered !',
            isDialogOpen: false
        };

        this.props.parentState.setServicesIsSelected(false);
        this.props.parentState.setInformationIsSelected(true);
        this.props.parentState.setPasswordIsSelected(false);
        this.handleSendConfirmationEmail = this.handleSendConfirmationEmail.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.onClickUpdateInfo = this.onClickUpdateInfo.bind(this);
        this.handleSuccessMessageClose = this.handleSuccessMessageClose.bind(this);
        this.handleDialogCloseNo = this.handleDialogCloseNo.bind(this);
        this.handleDialogCloseYes = this.handleDialogCloseYes.bind(this);
        this.handleCloseConfirmationDialog = this.handleCloseConfirmationDialog.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
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
        }, (error) => {
            if (error.response.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                this.setState({
                    styleMenu: {
                        'margin-left': '-300px'
                    },
                    menuIsOpen: false,
                    title: 'Home',
                    visibilityBackground: 'hidden',
                    opacityBackground: '0'
                })
                history.push('/');
            }
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
            this.setState({
                sendingSendConfirmationEmail: false,
                errorMessageOpen: true,
                errorMessageText: 'Error when sending confirmation email'
            });
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

        const changedEmail = data.email !== this.service.getEmail();

        this.service.updateUserInfos(data,() => {
            this.setState({
                sendingUpdateInfo: false,
                successMessageOpen: true,
                successMessageText: 'Infos updated !',
                activateEmail: !changedEmail
            });
        }, () => {
            this.setState({
                sendingUpdateInfo: false,
                errorMessageOpen: true,
                errorMessageText: 'Error when updated your infos'
            });
        });
    }

    handleSuccessMessageClose()
    {
        this.setState({
            successMessageOpen: false,
        });
    }

    handleCloseConfirmationDialog()
    {}

    handleDeleteAccount()
    {
        this.setState({
            isDialogOpen: true,
            sendingDeleteAccount: true,
        });
    }

    handleDialogCloseYes()
    {
        this.setState({
            isDialogOpen: false,
        });

        this.service.deleteUser(() => {
            this.setState({
                sendingDeleteAccount: false,
                successMessageOpen: true,
                successMessageText: 'Account deleted'
            });
            localStorage.removeItem('JWTToken');
            history.push('/');
        }, () => {
            this.setState({
                sendingDeleteAccount: false,
                errorMessageOpen: true,
                errorMessageText: 'Error when delete your account'
            });
        });
    }

    handleDialogCloseNo()
    {
        this.setState({
            isDialogOpen: false,
            sendingDeleteAccount: false,
        });
    }

    handleErrorMessageClose()
    {
        this.setState({
            errorMessageOpen: false,
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
                            <button onClick={this.onClickUpdateInfo} disabled={this.state.sendingUpdateInfo} >Update</button>
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
                            <button onClick={this.handleDeleteAccount}>Delete your account</button>
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

                <Snackbar open={this.state.errorMessageOpen} onClose={this.handleErrorMessageClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <Alert onClose={this.handleErrorMessageClose} severity="error" variant="filled">
                        {this.state.errorMessageText}
                    </Alert>
                </Snackbar>

                <Dialog
                    open={this.state.isDialogOpen}
                    keepMounted
                    onClose={this.handleCloseConfirmationDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete your account ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Be careful this action is irreversible. This will delete your account forever.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogCloseNo} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleDialogCloseYes} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Information;