import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidCountryCase.css'
import CovidImage from '../../../../assets/images/covid.png'

class CovidCountryCase extends Component
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
            <div id="covid-country-case">
                <div className="content">
                    <div className="header">
                        <div className="covid-logo">
                            <img src={CovidImage} />
                        </div>
                        <div className="title">
                            <p>Case per country</p>
                        </div>
                        <div className="logo-parameters">
                            <FiSettings color="white" size={30}/>
                        </div>
                    </div>
                    <div className="content">
                        <div className="description">
                            <p>In {this.state.model.Country}, {new Date(this.state.model.Date).toLocaleString()}</p>
                        </div>
                        <div className="total-deaths">
                            <p>Total deaths : {this.state.model.Deaths}</p>
                        </div>
                        <div className="total-recovered">
                            <p>Total recovered : {this.state.model.Recovered}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CovidCountryCase;
