import React, {Component} from "react";
import WeatherService from "../../../../core/services/services/WeatherService";
import CityWeatherModel from "../../../../core/models/services/weather/response/CityWeatherModel";
import './WeatherCityMeteo.css'
import LocationImage from '../../../../assets/images/placeholder.png';
import {FiSettings} from "react-icons/fi";
import HumidityImage from '../../../../assets/images/humidity.png'
import SunImage from '../../../../assets/images/sun.png'

class WeatherCityMeteo extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new CityWeatherModel()
        }
        this.service = new WeatherService();
        this.getDataWidget();
    }

    getDataWidget()
    {
        this.service.getCityWeatherWidget(this.props.id, () => {
            console.log( this.service.getDataResponse());
            this.setState({
                model: this.service.getDataResponse()
            })
        }, () => {

        });
    }

    initImageWeather()
    {
        if (this.state.model.description === 'clear sky') {
            return (SunImage);
        }
        return null;
    }

    render() {
        const imageWeather = this.initImageWeather();

        return (
            <div class="widget" id="weather-city-meteo">
                <div class="content">
                    <div class="header">
                        <div class="logo-location">
                            <img src={LocationImage} />
                        </div>
                        <div class="location">
                            <p>{this.state.model.city}</p>
                        </div>
                        <div class="logo-parameters">
                            <FiSettings color="white" size={30} />
                        </div>
                    </div>
                    <div class="content">
                        <div className="weather">
                            <img src={imageWeather} />
                        </div>
                        <div class="temperature">
                            <p>{this.state.model.temp} {this.state.model.celsius ? '°C' : '°F'}</p>
                        </div>
                        <div class="humidity">
                            <img src={HumidityImage} />
                            <p>{this.state.model.humidity}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherCityMeteo;