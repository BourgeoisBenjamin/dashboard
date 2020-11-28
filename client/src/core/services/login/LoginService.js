import axios from 'axios';

class RegisterService
{
    register(data, onSuccess, onFailure)
    {
        axios.post(`account/login`, data)
            .then(res => {
                localStorage.setItem('JWTToken', res.data.JWTToken)
                onSuccess(res);
            }).catch(error => {
                onFailure(error);
        })
    }
}

export default RegisterService;