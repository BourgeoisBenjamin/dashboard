import React, { Component } from 'react';
import history from "../../history";
import MenuContext from "../../core/contexts/MenuContext";

class Home extends Component {

    static contextType = MenuContext;

    constructor(props) {
        super(props);

        if (localStorage.getItem('JWTToken') == null) {
            history.push('/');
        }
    }

    componentDidMount()
    {
        this.context.setShowMenu('block');
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}

export default Home;