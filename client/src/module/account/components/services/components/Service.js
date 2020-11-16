import React, {Component} from "react";
import './Service.css'

class Service extends Component
{
    render() {
        return (
            <div class="service">
                <div class="logo">
                    <img alt="" src={this.props.logo} />
                </div>
                <div class="title">
                    <p>{this.props.title}</p>
                </div>
                <div className={`button connect-button ${this.props.connected ? 'hide' : ''}`}>
                    <button onClick={this.props.onClick}>Connect</button>
                </div>
                <div className={`button disconnect-button ${this.props.connected ? '' : 'hide'}`}>
                    <button onClick={this.props.onClick}>Disconnect</button>
                </div>
            </div>
        )
    }
}

export default Service;