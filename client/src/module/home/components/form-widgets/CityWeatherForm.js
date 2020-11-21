import React, {Component} from "react";
import CityInput from "../../../../shared/components/inputs/CityInput";
import SelectInput from "../../../../shared/components/inputs/SelectInput";
import WeatherService from "../../../../core/services/services/WeatherService";
import CityWeatherModel from "../../../../core/models/services/weather/CityWeatherModel";
import {services} from "../../services";

class CityWeatherForm extends Component
{
    constructor(props)
    {
        super(props);

        this.service = new WeatherService();

        this.state = {
            temperatureOptions: [
                {
                    name: 'Celsius'
                },
                {
                    name: 'Fahrenheit'
                }
            ],
            cityName: '',
            temperature: ''
        };

        this.props.parentState.setOnClickAddWidget(() => {
            this.onClickAddWidget();
        })

        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    onClickAddWidget()
    {
        let model = new CityWeatherModel();

        model.celsius = (this.state.temperature === 'Celsius');
        model.city = this.state.cityName;

        this.service.postCityWeatherWidget(model, () => {

        }, () => {

        });
    }

    render() {
        return (
            <div id="city-weather-form">
                <CityInput name="City" value={this.state.cityName} onChange={this.handleCityChange} />
                <SelectInput
                    label="Temperature" onChange={this.handleSelectChange} value={this.state.temperature}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Select a temperature</em>;
                        }
                        return selected;
                    }}
                    name="Select a temperature" arrayKey="name" arrayValue="name" array={this.state.temperatureOptions}
                />
            </div>
        );
    }

    handleCityChange(e)
    {
        this.setState({
            cityName: e.target.value
        });
    }

    handleSelectChange(e)
    {
        this.setState({
            temperature: e.target.value
        });
    }
}

export default CityWeatherForm;