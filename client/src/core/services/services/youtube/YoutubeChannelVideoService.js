import ChannelVideosModelRequest from "../../../models/services/youtube/request/ChannelVideosModel";
import ChannelVideosModelResponse from "../../../models/services/youtube/response/ChannelVideosModel";
import axios from "axios";

export default class YoutubeChannelVideoService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    url = 'http://localhost:8080/service/youtube/channel-videos/'

    constructor()
    {
        this.requestModel = new ChannelVideosModelRequest();
        this.responseModel = new ChannelVideosModelResponse();
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