import React, {Component} from "react";
import './Service.css'

class Service extends Component
{
    handleConnectClick = () =>
    {
        this.props.onClickConnect(this.props.title);
    }

    handleDisconnectClick = () =>
    {
        this.props.onClickDisconnect(this.props.title);
    }

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
                    <button onClick={this.handleConnectClick}>Connect</button>
                </div>
                <div className={`button disconnect-button ${this.props.connected ? '' : 'hide'}`}>
                    <button onClick={this.handleDisconnectClick}>Disconnect</button>
                </div>
            </div>
        )
    }
}

export default Service;