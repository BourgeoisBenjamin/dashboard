import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidSummaryCountry.css'
import CovidImage from '../../../../assets/images/covid.png'

class CovidSummaryCountry extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new CountryCaseModel()
        }
        this.service = new CovidService();
        this.getDataWidget();
    }

    getDataWidget()
    {
        this.service.getCountryCase(this.props.id, () => {
            console.log( this.service.getDataCountryCaseResponse());
            this.setState({
                model: this.service.getDataCountryCaseResponse()
            })
        }, () => {

        });
    }

    render() {
        return (
            <div id="covid-summary-country">
                <div className="content">
                    <div className="header">
                        <div className="covid-logo">
                            <img src={CovidImage} />
                        </div>
                        <div className="title">
                            <p>Summary country</p>
                        </div>
                        <div className="logo-parameters">
                            <FiSettings color="white" size={30}/>
                        </div>
                    </div>
                    <div className="content">
                    </div>
                </div>
            </div>
        );
    }
}

export default CovidSummaryCountry;