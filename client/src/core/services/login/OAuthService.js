import axios from 'axios';

class OAuthService
{
    connectOAuth(onConnect, onSuccess, onFailure)
    {
        axios.get(`http://localhost:8080/account/login/tiers/init`)
            .then(res => {
                const params = {uuid: res.data.uuid}
                axios.get('http://localhost:8080/account/login/tiers/oauth', {params})
                    .then(res => {
                        localStorage.setItem('JWTToken', res.data.JWTToken)
                        onSuccess(res);
                    }).catch(error => {
                    onFailure(error);
                })
                onConnect(res.data.uuid)
            }).catch(error => {
            onFailure(error);
        })
    }

    connectTwitter(uuid)
    {
        // eslint-disable-next-line no-useless-concat
        window.open('http://localhost:8080/account/login/tiers/twitter' + '?uuid=' + uuid, 'Login with Twitter', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=600');
    }

    connectGoogle(uuid)
    {
        // eslint-disable-next-line no-useless-concat
        window.open('http://localhost:8080/account/login/tiers/google' + '?uuid=' + uuid, 'Login with Google', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=600');
    }
}

export default OAuthService;