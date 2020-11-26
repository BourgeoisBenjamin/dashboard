import axios from "axios";
import TopArtistsUserModelRequest from "../../../models/services/spotify/request/TopArtistsUserModel";
import TopArtistsUserModelResponse from "../../../models/services/spotify/response/TopArtistsUserModel";

export default class SpotifyTopArtistsUserService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    url = 'http://localhost:8080/service/spotify/top-artists-user/'

    constructor()
    {
        this.requestModel = new TopArtistsUserModelRequest();
        this.responseModel = new TopArtistsUserModelResponse();
    }

    get(idWidget, onSuccess, onFailure)
    {
        axios.get(this.url + idWidget, this.header)
            .then(res => {
                Object.assign(this.responseModel.data, res.data);
                onSuccess();
            }).catch(error => {
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
            onFailure();
        })
    }

    delete(idWidget, onSuccess, onFailure)
    {
        axios.delete(this.url + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
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
}