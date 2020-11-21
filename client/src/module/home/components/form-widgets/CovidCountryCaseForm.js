import React, {Component} from "react";
import CountryInput from "../../../../shared/components/inputs/CountryInput";
import CityInput from "../../../../shared/components/inputs/CityInput";

class CovidCountryCaseForm extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            countryName: ''
        }
    }

    render() {
        return (
            <div id="covid-country-case-form">
                <div class="country-input">
                    <CountryInput name="City" value={this.state.countryName} onChange={this.handleCountryChange} />
                </div>
            </div>
        );
    }

    handleCountryChange(e)
    {
        this.setState({
            countryName: e.target.value
        });
    }
}

export default CovidCountryCaseForm;
