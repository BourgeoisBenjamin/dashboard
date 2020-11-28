import React, { Component } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc';
import { RiLockPasswordLine } from 'react-icons/ri'
import MenuContext from "../../core/contexts/MenuContext";
import './Account.css'
import Information from "./components/information/Information";
import { Route, Switch, Redirect } from 'react-router-dom';
import history from "../../history";
import Password from "./components/password/Password";
import Services from "./components/services/Services";

class Account extends Component {

    static contextType = MenuContext;

    constructor(props)
    {
        super(props);

        document.title = 'Dashboard - Account';

        this.state = {
            informationIsSelected: false,
            passwordIsSelected: false,
            servicesIsSelected: false,

            setInformationIsSelected: (newValue) => {
                this.setState({informationIsSelected: newValue});
            },
            setPasswordIsSelected: (newValue) => {
                this.setState({passwordIsSelected: newValue});
            },
            setServicesIsSelected: (newValue) => {
                this.setState({servicesIsSelected: newValue});
            }
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
        history.push('/account/information');
    }

    onClickPassword()
    {
        history.push('/account/password');
    }

    onClickServices()
    {
        history.push('/account/services');
    }

    render() {
        return (
            <div id="account-module">
                <div class="account-menu">
                    <div className={this.state.informationIsSelected ? "element selected" : "element"} onClick={this.onClickInformation}>
                        <div class="logo">
                            <VscAccount/>
                        </div>
                        <div class="name">
                            <p>Information</p>
                        </div>
                    </div>
                    { this.context.isConnectedViaTiers ? null : (
                        <div className={this.state.passwordIsSelected ? "element selected" : "element"} onClick={this.onClickPassword}>
                            <div className="logo">
                                <RiLockPasswordLine/>
                            </div>
                            <div className="name">
                                <p>Password</p>
                            </div>
                        </div>
                    ) }
                    <div className={this.state.servicesIsSelected ? "element selected" : "element"} onClick={this.onClickServices}>
                        <div className="logo">
                            <AiOutlineShareAlt/>
                        </div>
                        <div className="name">
                            <p>Services</p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <Switch>
                        <Route path={'/account/information'}>
                            <Information parentState={this.state}/>
                        </Route>
                        <Route path={'/account/password'}>
                            <Password parentState={this.state}/>
                        </Route>
                        <Route path={'/account/services'}>
                            <Services parentState={this.state}/>
                        </Route>
                        <Route path="/account">
                            <Redirect to="/account/information" />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Account;