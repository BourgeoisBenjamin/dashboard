import axios from 'axios';

class ForgotPasswordService
{
    forgot(data, onSuccess, onFailure)
    {
        axios.post(`account/password/lost`, data)
        .then(res => {
            onSuccess(res);
        }).catch(error => {
            onFailure(error);
        })
    }

    reset(data, onSuccess, onFailure)
    {
        axios.post(`account/password/reset`, data)
            .then(res => {
                onSuccess(res);
            }).catch(error => {
            onFailure(error);
        })
    }
}

export default ForgotPasswordService;