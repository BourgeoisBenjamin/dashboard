import React, { Component } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc';
import { RiLockPasswordLine } from 'react-icons/ri'
import MenuContext from "../../core/contexts/MenuContext";
import './Account.css'
import Services from "./components/services/Services";
import Information from "./components/information/Information";
import Password from "./components/password/Password";

class Account extends Component {

    static contextType = MenuContext;

    constructor(props)
    {
        super(props);

        this.state = {
            informationIsSelected: true,
            passwordIsSelected: false,
            servicesIsSelected: false,
        };

        this.onClickInformation = this.onClickInformation.bind(this);
        this.onClickPassword = this.onClickPassword.bind(this);
        this.onClickServices = this.onClickServices.bind(this);
    }

    componentDidMount()
    {
        this.context.setShowMenu('block');
    }

    onClickInformation()
    {
        this.setState({
            informationIsSelected: true,
            passwordIsSelected: false,
            servicesIsSelected: false
        });
    }

    onClickPassword()
    {
        this.setState({
            informationIsSelected: false,
            passwordIsSelected: true,
            servicesIsSelected: false
        });
    }

    onClickServices()
    {
        this.setState({
            informationIsSelected: false,
            passwordIsSelected: false,
            servicesIsSelected: true
        });
    }

    render() {
        return (
            <div id="account-module">
                <div class="account-menu">
                    <div className={this.state.informationIsSelected ? "element selected" : "element"} onClick={this.onClickInformation}>
                        <div class="logo">
                            <VscAccount></VscAccount>
                        </div>
                        <div class="name">
                            <p>Information</p>
                        </div>
                    </div>
                    <div className={this.state.passwordIsSelected ? "element selected" : "element"} onClick={this.onClickPassword}>
                        <div className="logo">
                            <RiLockPasswordLine></RiLockPasswordLine>
                        </div>
                        <div className="name">
                            <p>Password</p>
                        </div>
                    </div>
                    <div className={this.state.servicesIsSelected ? "element selected" : "element"} onClick={this.onClickServices}>
                        <div className="logo">
                            <AiOutlineShareAlt></AiOutlineShareAlt>
                        </div>
                        <div className="name">
                            <p>Services</p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <Information className="element" hide={ !this.state.informationIsSelected }/>
                    <Services class="element" hide={ !this.state.servicesIsSelected }/>
                    <Password class="element" hide={ !this.state.passwordIsSelected }/>
                </div>
            </div>
        );
    }
}

export default Account;