import Service from "../Service";
import CityWeatherModelRequest from "../../../models/services/weather/request/CityWeatherModel";
import CityWeatherModelResponse from "../../../models/services/weather/response/CityWeatherModel";

export default class WeatherCityMeteoService extends Service
{
    constructor()
    {
        super(
            'http://localhost:8080/service/weather/city-meteo/',
            new CityWeatherModelRequest(),
            new CityWeatherModelResponse(),
            (res, responseModel) => {
                Object.assign(responseModel, res.data);
            }
        );
    }
}