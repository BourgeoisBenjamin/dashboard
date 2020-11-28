import axios from "axios";

class Service
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }
    url;
    requestModel;
    responseModel;
    onGetSucceed;
    error;

    constructor(url, requestModel, responseModel, onGetSucceed)
    {
        if (this.constructor === Service) {
            throw Error("Abstract classes can't be instantiated.");
        }
        this.url = url;
        this.requestModel = requestModel;
        this.responseModel = responseModel;
        this.onGetSucceed = onGetSucceed;
    }

    get(idWidget, onSuccess, onFailure)
    {
        axios.get(this.url + idWidget, this.header)
            .then(res => {
                this.onGetSucceed(res, this.responseModel);
                onSuccess();
            }).catch(error => {
            this.error = error;
            onFailure();
        })
    }

    getParams(idWidget, onSuccess, onFailure)
    {
        axios.get(this.url + idWidget + '/params', this.header)
            .then(res => {
                Object.assign(this.requestModel, res.data);
                onSuccess();
            }).catch(error => {
                this.error = error;
            onFailure();
        })
    }

    put(data, idWidget, onSuccess, onFailure)
    {
        axios.put(this.url + idWidget, data, this.header)
            .then(res => {
                Object.assign(this.requestModel, data);
                onSuccess();
            }).catch(error => {
            this.error = error;
            onFailure();
        })
    }

    post(data, onSuccess, onFailure)
    {
        axios.post(this.url, data, this.header)
            .then(res => {
                Object.assign(this.requestModel, data);
                onSuccess();
            }).catch(error => {
            this.error = error;
            onFailure();
        })
    }

    delete(idWidget, onSuccess, onFailure)
    {
        axios.delete(this.url + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
            this.error = error;
            onFailure();
        })
    }

    getRequestModel()
    {
        return this.requestModel;
    }

    getResponseModel()
    {
        return this.responseModel;
    }

    getError()
    {
        return this.error;
    }
}

export default Service;