import React, { Component } from 'react';
import BasicButton from "../../shared/components/buttons/BasicButton";
import history from "../../history";
import './NotFound.css'
import MenuContext from "../../core/contexts/MenuContext";

class NotFound extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);
        this.handleOnClickBackHome = this.handleOnClickBackHome.bind(this);
    }

    componentDidMount() {
        this.context.setShowMenu('none');
    }

    handleOnClickBackHome()
    {
        history.push('/');
    }

    render() {
        return (
            <div id="not-found-module">
                <div className="title">
                    <p>Error 404</p>
                </div>
                <div className="description">
                    <p>The page you want to access doesn't exist.</p>
                </div>
                <div className="button">
                    <BasicButton onClick={this.handleOnClickBackHome} loaderSize={50} name="Back to home" />
                </div>
            </div>
        );
    }

}

export default NotFound;