import React, {Component} from "react";
import './Services.css'

class Services extends Component
{
    render() {
        return (
            <div id="services" class={this.props.hide ? 'hide' : ''}>
                <p>Services</p>
            </div>
        )
    }
}

export default Services;