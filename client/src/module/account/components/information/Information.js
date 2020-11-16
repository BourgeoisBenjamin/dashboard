import React, {Component} from "react";
import './Information.css'

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
            <div id="information">
                <p>coucou</p>
            </div>
        );
    }
}

export default Information;