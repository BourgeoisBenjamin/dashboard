import React, {Component} from "react";
import WeatherService from "../../../../core/services/services/WeatherService";
import CityWeatherModel from "../../../../core/models/services/weather/response/CityWeatherModel";
import './WeatherCityMeteo.css'

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
            this.setState({
                model: this.service.getDataResponse()
            })
        }, () => {

        });
    }

    render() {
        return (
            <div class="widget" id="weather-city-meteo">
                <div class="content">
                    <div class="header">
                        <div class="location">
                            <p>{this.state.model.city}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherCityMeteo;