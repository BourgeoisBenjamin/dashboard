import React, {Component} from "react";
import CityWeatherModel from "../../../../core/models/services/weather/response/CityWeatherModel";
import './WeatherCityMeteo.css'
import HumidityImage from '../../../../assets/images/humidity.png'
import SunImage from '../../../../assets/images/sun.png'
import PressureImage from '../../../../assets/images/pressure.png';
import RainImage from '../../../../assets/images/rain.png';
import LocationImage from '../../../../assets/images/placeholder.png'
import history from "../../../../history";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";
import WeatherCityMeteoService from "../../../../core/services/services/weather/WeatherCityMeteoService";

class WeatherCityMeteo extends Component
{
    constructor(props) {
        super(props);

        this.service = new WeatherCityMeteoService();

        this.state = {
            model: new CityWeatherModel(),
            isLoading: true,
            errorMessage: '',
            errorAppear: false
        }

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters = this.onClickParameters.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);

        this.getDataWidget();
    }

    getDataWidget(isLoading = true)
    {
        this.setState({
            isLoading: isLoading,
            errorAppear: false
        })
        this.service.get(this.props.id, () => {
            this.setState({
                model: this.service.getResponseModel(),
                isLoading: false
            })
        }, () => {
            this.setState({
                isLoading: false,
                errorMessage: 'Could not load data',
                errorAppear: true
            })
        });
        setTimeout(() => {
            this.getDataWidget(false);
        }, 60000);
    }

    initImageWeather()
    {
        if (this.state.model.description === 'clear sky') {
            return (SunImage);
        }
        return null;
    }

    onClickDelete()
    {
        this.service.delete(this.props.id, () => {
            this.props.onClickDelete();
        }, () => {
        });
    }

    render() {
        const imageWeather = this.initImageWeather();

        return (
            <div id="weather-city-meteo">
                <div class="content">
                    <WidgetHeader
                        mainTitle="Weather"
                        secondTitle="City weather"
                        onClickRefresh={this.getDataWidget}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                    <div class="content" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
                        <div class="city-name">
                            <div class="logo">
                                <img src={LocationImage} alt=""/>
                            </div>
                            <div class="name">
                                <p>{this.state.model.city}</p>
                            </div>
                        </div>
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
                    <WidgetLoader isLoading={this.state.isLoading} />
                    <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
                </div>
            </div>
        );
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/weather/city-weather/',
            search: '?id=' + this.props.id
        })
    }
}

export default WeatherCityMeteo;