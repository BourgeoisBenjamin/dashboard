import React, {Component} from "react";
import './Password.css'

class Password extends Component
{
    render() {
        return (
            <div id="password" class={this.props.hide ? 'hide' : ''}>
                <p>Password</p>
            </div>
        );
    }
}

export default Password;