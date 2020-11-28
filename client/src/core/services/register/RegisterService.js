import axios from 'axios';

class RegisterService
{
    register(data, onSuccess, onFailure)
    {
        axios.post(`account/register`, data)
        .then(res => {
            onSuccess(res);
        }).catch(error => {
            onFailure(error);
        })
    }
}

export default RegisterService;