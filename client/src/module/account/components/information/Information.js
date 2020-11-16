import React, {Component} from "react";
import './Information.css'
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

class Information extends Component
{
    constructor(props)
    {
        super(props);

        this.props.parentState.setServicesIsSelected(false);
        this.props.parentState.setInformationIsSelected(true);
        this.props.parentState.setPasswordIsSelected(false);
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
                                />
                            </FormControl>
                        </div>
                        <div class="update-button">
                            <button onClick={this.onClickRegister}>Update</button>
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
                                />
                            </FormControl>
                        </div>
                        <div className="update-button">
                            <button onClick={this.onClickRegister}>Send confirmation mail</button>
                        </div>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Information;