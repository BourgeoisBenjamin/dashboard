import React, { Component } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdDoNotDisturbOn } from 'react-icons/md'
import EmailVerifyService from "../../core/services/email-verify/EmailVerifyService";
import './EmailVerify.css'
import ClipLoader from "react-spinners/ClipLoader";
import history from "../../history";

class EmailVerify extends React.Component
{
    service;

    constructor(props) {
        super(props);

        const { token } = this.props.match.params

        console.log(token);

        this.service = new EmailVerifyService(token);

        this.state = {
            title: 'Verify your email',
            isVerify: false,
            errorWhenSendingRequest: false
        };
        this.sendRequestEmailVerify()
    }

    sendRequestEmailVerify()
    {
        this.service.verifyEmail(() => {
            this.setState({title: 'Your account is verify !', isVerify: true});
            setTimeout(() => {
                history.push('/');
            }, 3000)
        }, () => {
            this.setState({title: 'Bad request please retry', errorWhenSendingRequest: true});
        });
    }

    render() {
        const statusVerify = this.state.isVerify ? <AiFillCheckCircle color="green"/> : this.state.errorWhenSendingRequest ? null : <ClipLoader
                                                                                                                        size={150}
                                                                                                                        color={"#123abc"}
                                                                                                                        loading={this.state.loading}
                                                                                                                    />
        const statusError = this.state.errorWhenSendingRequest ? <MdDoNotDisturbOn color="red"/> : null;

        return (
            <div id="email-verify-module">
                <div class="title">
                    <p>{this.state.title}</p>
                </div>
                <div className="status" >
                    {statusVerify}
                    {statusError}
                </div>
            </div>
        );
    }
}

export default EmailVerify;