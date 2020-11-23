import React, {Component} from "react";
import WeatherService from "../../../../core/services/services/WeatherService";
import CityWeatherModel from "../../../../core/models/services/weather/response/CityWeatherModel";
import './WeatherCityMeteo.css'
import LocationImage from '../../../../assets/images/placeholder.png';
import {FiSettings} from "react-icons/fi";
import HumidityImage from '../../../../assets/images/humidity.png'
import SunImage from '../../../../assets/images/sun.png'
import {Draggable} from "react-beautiful-dnd";
import history from "../../../../history";

class WeatherCityMeteo extends Component
{
    constructor(props) {
        super(props);

        this.service = new WeatherService();

        this.state = {
            model: new CityWeatherModel()
        }

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters = this.onClickParameters.bind(this);

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
            <div id="weather-city-meteo"
            >
                <div class="content">
                    <div class="header">
                        <div class="logo-location">
                            <img src={LocationImage} />
                        </div>
                        <div class="location">
                            <p>{this.state.model.city}</p>
                        </div>
                        <div class="logo-parameters" onClick={this.onClickParameters}>
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

    onClickParameters()
    {
        // history.push('/home/widget/covid/country-case/' + this.props.id);
        history.push({
            pathname: '/home/widget/weather/city-weather/',
            search: '?id=' + this.props.id
        })
    }
}

export default WeatherCityMeteo;