import axios from 'axios';

export default class EmailVerifyService
{
    token;

    constructor(token)
    {
        this.token = token;
    }

    verifyEmail(onSuccess, onFailure)
    {
        const data = {
            token_email: this.token
        };

        axios.post(`http://localhost:8080/account/email/verify/`, data)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }
}