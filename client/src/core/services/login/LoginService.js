import axios from 'axios';

class RegisterService
{
    register(data, onSuccess, onFailure)
    {
        axios.post(`http://localhost:8080/account/login`, data)
            .then(res => {
                localStorage.setItem('JWTToken', res.data.JWTToken)
                onSuccess(res);
            }).catch(error => {
                onFailure(error);
        })
    }
}

export default RegisterService;