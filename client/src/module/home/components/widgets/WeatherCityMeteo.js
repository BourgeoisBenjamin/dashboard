import React, {Component} from "react";
import WeatherService from "../../../../core/services/services/WeatherService";
import CityWeatherModel from "../../../../core/models/services/weather/response/CityWeatherModel";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import HumidityImage from '../../../../assets/images/humidity.png'
import SunImage from '../../../../assets/images/sun.png'
import PressureImage from '../../../../assets/images/pressure.png';
import RainImage from '../../../../assets/images/rain.png';
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
                        <div class="location">
                            <p>Weather</p>
                        </div>
                        <div class="logo-parameters" onClick={this.onClickParameters}>
                            <FiSettings color="white" size={30} />
                        </div>
                    </div>
                    <div class="content">
                        <div class="temperature">
                            <div className="weather">
                                <img src={imageWeather} alt="" />
                            </div>
                            <div class="degree">
                                <p>{this.state.model.temp}°</p>
                            </div>
                            <div class="type-degree">
                                <p>{this.state.model.celsius ? 'C' : 'F'}</p>
                            </div>
                        </div>
                        <div class="humidity element">
                            <div class="icon">
                                <img alt="" src={HumidityImage} />
                            </div>
                            <div class="description">
                                <p>Humidity</p>
                            </div>
                            <div class="value">
                                <p>{this.state.model.humidity}%</p>
                            </div>
                        </div>
                        <div class="pressure element">
                            <div className="icon">
                                <img alt="" src={PressureImage}/>
                            </div>
                            <div className="description">
                                <p>Pressure</p>
                            </div>
                            <div className="value">
                                <p>{this.state.model.pressure}</p>
                            </div>
                        </div>
                        <div class="rain element">
                            <div className="icon">
                                <img alt="" src={RainImage}/>
                            </div>
                            <div className="description">
                                <p>Rain</p>
                            </div>
                            <div className="value">
                                <p>{this.state.model.rain}%</p>
                            </div>
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