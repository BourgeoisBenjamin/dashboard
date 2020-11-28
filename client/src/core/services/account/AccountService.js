import AccountModel from "../../models/account/AccountModel";
import axios from "axios";

class AccountService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    constructor()
    {
        this.model = new AccountModel();
        this.userServices = [];
    }

    getInfos(onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.get(`account/infos`, header)
            .then(res => {
                console.log(res);
                Object.assign(this.model, res.data);
                onSuccess();
            }).catch(error => {
                onFailure(error);
        })
    }

    resendEmail(onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.post(`account/email/send`, null, header)
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

        axios.post(`account/infos`, data, header)
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

        axios.delete(`account/delete`, header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    changePassword(data, onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.put(`account/password/update`, data, header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure(error);
        });
    }

    getUserServices(onSuccess, onFailure)
    {
        const header = {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
            }
        }

        axios.get(`account/service`, header)
            .then(res => {
                this.userServices = res.data.data;
                onSuccess();
            }).catch(error => {
                onFailure(error);
        });
    }

    init(onSuccess, onFailure)
    {
        axios.get(`account/service/init`, this.header)
            .then(res => {
                onSuccess(res.data.uuid);
            }).catch(error => {
                onFailure();
        });
    }

    getServiceConnect(uuid, onSuccess, onFailure) {
        const header = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('JWTToken')}`
            },
            params: {
                uuid: uuid
            }
        }

        axios.get(`account/service/connect`, header)
            .then(res => {
                console.log(res);
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    disconnectTwitter(onSuccess, onFailure)
    {
        axios.post(`account/service/twitter/disconnect`, null, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    disconnectGoogle(onSuccess, onFailure)
    {
        axios.post(`account/service/google/disconnect`, null, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    disconnectSpotify(onSuccess, onFailure)
    {
        axios.post(`account/service/spotify/disconnect`, null, this.header)
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

    getUserServicesData()
    {
        return this.userServices;
    }
}

export default AccountService;