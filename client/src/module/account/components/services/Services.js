import React, {Component} from "react";
import './Services.css'

class Services extends Component
{
    constructor(props) {
        super(props);

        this.props.parentState.setServicesIsSelected(true);
        this.props.parentState.setInformationIsSelected(false);
        this.props.parentState.setPasswordIsSelected(false);
    }

    render() {
        return (
            <div id="services">
                <p>Services</p>
            </div>
        )
    }
}

export default Services;