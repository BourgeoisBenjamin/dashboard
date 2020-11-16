import React, {Component} from "react";
import './Password.css'
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

class Password extends Component
{
    constructor(props)
    {
        super(props);

        this.props.parentState.setServicesIsSelected(false);
        this.props.parentState.setInformationIsSelected(false);
        this.props.parentState.setPasswordIsSelected(true);
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
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Old password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start"><LockIcon/></InputAdornment>}
                                    labelWidth={100}
                                    type="password"
                                />
                            </FormControl>
                        </div>
                        <div className="input">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">New password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start"><LockIcon/></InputAdornment>}
                                    labelWidth={120}
                                    type="password"
                                />
                            </FormControl>
                        </div>
                        <div className="input">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Confirm new password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start"><LockIcon/></InputAdornment>}
                                    labelWidth={200}
                                    type="password"
                                />
                            </FormControl>
                        </div>
                        <div className="button">
                            <button onClick={this.onClickRegister}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Password;