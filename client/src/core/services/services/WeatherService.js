import axios from 'axios';
import CityWeatherModel from "../../models/services/weather/CityWeatherModel";

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
        this.model = new CityWeatherModel();
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
                Object.assign(this.model, res.data);
                onSuccess();
            }).catch(error => {
                onFailure();
            });
    }

    putCityWeatherWidget(idWidget, onSuccess, onFailure)
    {
        axios.put(this.url + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    postCityWeatherWidget(data, onSuccess, onFailure)
    {
        axios.post(this.url, data, this.header)
            .then(res => {
                Object.assign(this.model, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        });
    }

    getData()
    {
        return this.model;
    }
}

export default WeatherService;