import React, {Component} from "react";
import './Password.css'

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
            <div id="password">
                <p>Password</p>
            </div>
        );
    }
}

export default Password;