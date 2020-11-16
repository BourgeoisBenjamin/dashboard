import React, {Component} from "react";
import './Information.css'

class Information extends Component
{
    render() {
        return (
            <div id="information" class={this.props.hide ? 'hide' : ''}>
                <p>Information</p>
            </div>
        );
    }
}

export default Information;