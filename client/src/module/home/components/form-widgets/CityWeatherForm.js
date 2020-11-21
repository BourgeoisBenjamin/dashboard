import React, {Component} from "react";
import CityInput from "../../../../shared/components/inputs/CityInput";
import SelectInput from "../../../../shared/components/inputs/SelectInput";
import WeatherService from "../../../../core/services/services/WeatherService";
import CityWeatherModel from "../../../../core/models/services/weather/CityWeatherModel";
import './CityWeatherForm.css'
import history from "../../../../history";

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

        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })

        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    onClickAddWidget(onSuccess, onFailure)
    {
        let model = new CityWeatherModel();

        model.celsius = (this.state.temperature === 'Celsius');
        model.city = this.state.cityName;

        this.props.parentState.setDisplayLoader(true);

        this.service.postCityWeatherWidget(model, () => {
            this.props.parentState.setDisplayLoader(false);
            onSuccess();
        }, () => {
            this.props.parentState.setDisplayLoader(false);
            onFailure();
        });
    }

    render() {
        return (
            <div id="city-weather-form">
                <div className="city-input">
                    <CityInput name="City" value={this.state.cityName} onChange={this.handleCityChange} />
                </div>
                <div className="temperature-input">
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