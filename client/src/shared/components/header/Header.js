import React, { Component } from 'react';
// import history from "../../../history";
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css'

class HeaderMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            styleMenu: {
                'margin-left': '-300px'
            },
            menuIsOpen: false
        };
    }

    handleClickMenuIcon = () =>
    {
        if (this.state.menuIsOpen) {
            this.setState({
                styleMenu: {
                    'margin-left': '-300px'
                },
                menuIsOpen: false
            })
        } else {
            this.setState({
                styleMenu: {
                    'margin-left': '0px'
                },
                menuIsOpen: true
            })
        }
    }

    render() {
        return (
            <div id="header-menu">
                <div className="header">
                    <div className="logo-menu">
                        <MenuIcon className="menu-icon" onClick={this.handleClickMenuIcon} />
                    </div>
                    <div className="title">
                        <p>Home</p>
                    </div>
                </div>
                <div className="menu" style={this.state.styleMenu}>
                    <div className="home-button button">
                        <p>Home</p>
                    </div>
                    <div className="profile-button button">
                        <p>Profile</p>
                    </div>
                    <div className="disconnect-button button">
                        <p>Disconnect</p>
                    </div>
                </div>
                {/*<div className="profile">*/}
                {/*    <div>*/}
                {/*        */}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default HeaderMenu;