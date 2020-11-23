import axios from 'axios';
import CityWeatherModelRequest from "../../models/services/weather/request/CityWeatherModel";
import CityWeatherModelResponse from "../../models/services/weather/response/CityWeatherModel";

class WeatherService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    url = 'http://localhost:8080/service/weather/city-meteo/'

    constructor()
    {
        this.modelRequest = new CityWeatherModelRequest();
        this.modelResponse = new CityWeatherModelResponse();
    }

    deleteCityWeatherWidget(idWidget, onSuccess, onFailure)
    {
        axios.delete(this.url + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    getCityWeatherWidget(idWidget, onSuccess, onFailure)
    {
        axios.get(this.url + idWidget, this.header)
            .then(res => {
                Object.assign(this.modelResponse, res.data);
                onSuccess();
            }).catch(error => {
                onFailure();
            });
    }

    getCityWeatherWidgetParams(idWidget, onSuccess, onFailure)
    {
        axios.get(this.url + idWidget + '/params', this.header)
            .then(res => {
                Object.assign(this.modelRequest, res.data);
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    putCityWeatherWidget(data, idWidget, onSuccess, onFailure)
    {
        axios.put(this.url + idWidget, data, this.header)
            .then(res => {
                Object.assign(this.modelRequest, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    postCityWeatherWidget(data, onSuccess, onFailure)
    {
        axios.post(this.url, data, this.header)
            .then(res => {
                Object.assign(this.modelRequest, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    getDataResponse()
    {
        return this.modelResponse;
    }

    getDataRequest()
    {
        return this.modelRequest;
    }
}

export default WeatherService;