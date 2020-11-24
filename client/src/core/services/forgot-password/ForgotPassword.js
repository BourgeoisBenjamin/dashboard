import axios from 'axios';

class ForgotPasswordService
{
    forgot(data, onSuccess, onFailure)
    {
        axios.post(`http://localhost:8080/account/password/lost`, data)
        .then(res => {
            onSuccess(res);
        }).catch(error => {
            onFailure(error);
        })
    }
}

export default ForgotPasswordService;