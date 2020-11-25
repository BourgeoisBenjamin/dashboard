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
import ClipLoader from "react-spinners/ClipLoader";
import {VscRefresh} from "react-icons/vsc";

class WeatherCityMeteo extends Component
{
    constructor(props) {
        super(props);

        this.service = new WeatherService();

        this.state = {
            model: new CityWeatherModel(),
            isLoading: false
        }

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters = this.onClickParameters.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);

        this.getDataWidget();
    }

    getDataWidget()
    {
        this.setState({
            isLoading: true
        })
        this.service.getCityWeatherWidget(this.props.id, () => {
            this.setState({
                model: this.service.getDataResponse(),
                isLoading: false
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
            <div id="weather-city-meteo">
                <div class="content">
                    <div class="header">
                        <div class="location">
                            <p>Weather</p>
                        </div>
                        <div className="options">
                            <div className="logo-refresh" onClick={this.getDataWidget}>
                                <VscRefresh color="white" size={30} />
                            </div>
                            <div className="logo-parameters" onClick={this.onClickParameters}>
                                <FiSettings color="white" size={30}/>
                            </div>
                        </div>
                    </div>
                    <div class="content" style={{ display: this.state.isLoading ? 'none' : 'block' }}>
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
                    <div className="loader" style={{ display: (this.state.isLoading ? 'block' : 'none' ) }}>
                        <ClipLoader size={50} />
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