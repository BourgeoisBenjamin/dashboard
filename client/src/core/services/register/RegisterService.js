import axios from 'axios';

class RegisterService
{
    register(data, onSuccess, onFailure)
    {
        axios.post(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                if (res.status === 200) {
                    onSuccess(res);
                } else {
                    onFailure(res);
                }
            })
    }
}

export default RegisterService;