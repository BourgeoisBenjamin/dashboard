import LastTweetsModelRequest from "../../models/services/twitter/request/LastTweetsModel";
import LastTweetsModelResponse from "../../models/services/twitter/response/LastTweetsModel";
import SearchTweetsModelRequest from "../../models/services/twitter/request/SearchTweetsModel";
import SearchTweetsModelResponse from "../../models/services/twitter/response/SearchTweetsModel";
import axios from "axios";


class TwitterService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    urlLastTweets = 'http://localhost:8080/service/twitter/last-tweets/'
    urlSearchTweets = 'http://localhost:8080/service/twitter/search-tweets/'

    constructor()
    {
        this.lastTweetsModelRequest = new LastTweetsModelRequest();
        this.lastTweetsModelResponse = new LastTweetsModelResponse();
        this.searchTweetsModelRequest = new SearchTweetsModelRequest();
        this.searchTweetsModelResponse = new SearchTweetsModelResponse();
    }

    getLastTweets(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlLastTweets + idWidget, this.header)
            .then(res => {
                Object.assign(this.lastTweetsModelResponse, res.data);
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    getLastTweetsParams(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlLastTweets + idWidget + '/params', this.header)
            .then(res => {
                Object.assign(this.lastTweetsModelRequest, res.data);
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    putLastTweets(data, idWidget, onSuccess, onFailure)
    {
        axios.put(this.urlLastTweets + idWidget, data, this.header)
            .then(res => {
                Object.assign(this.lastTweetsModelRequest, data);
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    postLastTweets(data, onSuccess, onFailure)
    {
        axios.post(this.urlLastTweets, data, this.header)
            .then(res => {
                Object.assign(this.lastTweetsModelRequest, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    deleteLastTweet(idWidget, onSuccess, onFailure)
    {
        axios.delete(this.urlLastTweets + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    getSearchTweets(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlSearchTweets + idWidget, this.header)
            .then(res => {
                Object.assign(this.searchTweetsModelResponse, res.data);
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    getSearchTweetsParams(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlSearchTweets + idWidget + '/params', this.header)
            .then(res => {
                Object.assign(this.searchTweetsModelRequest, res.data);
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    putSearchTweets(data, idWidget, onSuccess, onFailure)
    {
        axios.put(this.urlSearchTweets + idWidget, data, this.header)
            .then(res => {
                Object.assign(this.searchTweetsModelRequest, data);
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    postSearchTweets(data, onSuccess, onFailure)
    {
        axios.post(this.urlSearchTweets, data, this.header)
            .then(res => {
                Object.assign(this.searchTweetsModelRequest, data);
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    deleteSearchTweet(idWidget, onSuccess, onFailure)
    {
        axios.delete(this.urlLastTweets + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
            onFailure();
        });
    }

    getLastTweetModelRequest()
    {
        return this.lastTweetsModelRequest;
    }

    getSearchTweetRequest()
    {
        return this.searchTweetsModelRequest;
    }

    getLastTweetModelResponse()
    {
        return this.lastTweetsModelResponse;
    }

    getSearchTweetResponse()
    {
        return this.searchTweetsModelResponse;
    }
}

export default TwitterService;