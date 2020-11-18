import AccountModel from "../../models/account/AccountModel";
import axios from "axios";

class AccountService
{
    constructor()
    {
        this.model = new AccountModel();
    }

    getInfos(onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.get(`http://localhost:8080/account/infos`, header)
            .then(res => {
                console.log(res);
                Object.assign(this.model, res.data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    resendEmail(onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.post(`http://localhost:8080/account/email/send`, null, header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    updateUserInfos(data, onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.post(`http://localhost:8080/account/infos`, data, header)
            .then(res => {
                Object.assign(this.model, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    deleteUser(onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.delete(`http://localhost:8080/account/infos`, header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    getUsername()
    {
        return this.model.username;
    }

    getEmail()
    {
        return this.model.email;
    }

    getActivateEmail()
    {
        return this.model.activate_email;
    }
}

export default AccountService;