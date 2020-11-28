import React, {Component} from "react";
import {VscRefresh} from "react-icons/vsc";
import MenuWidgetHeader from "../menu-widget-header/MenuWidgetHeader";
import './WidgetHeader.css'

class WidgetHeader extends Component
{
    render() {
        return (
            <div className="widget-header">
                <div className="title">
                    <div className="main-title">
                        <p>{this.props.mainTitle}</p>
                    </div>
                    <div className="second-title">
                        <p>{this.props.secondTitle}</p>
                    </div>
                </div>
                <div className="options">
                    <div className="logo-refresh" onClick={this.props.onClickRefresh}>
                        <VscRefresh color="white" size={30} />
                    </div>
                    <div className="logo-parameters">
                        <MenuWidgetHeader onClickSettings={this.props.onClickSettings} onClickDelete={this.props.onClickDelete} />
                    </div>
                </div>
            </div>
        );
    }
}

export default WidgetHeader;