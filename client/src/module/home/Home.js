import React, { Component } from 'react';
import history from "../../history";

class Home extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('JWTToken') == null) {
            history.push('/');
        }
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