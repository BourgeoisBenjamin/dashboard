import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidSummaryCountry.css'
import CovidImage from '../../../../assets/images/covid.png'
import {Draggable} from "react-beautiful-dnd";

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
        this.service.getSummaryCountry(this.props.id, () => {
            console.log( this.service.getDataSummaryCountryResponse());
            this.setState({
                model: this.service.getDataSummaryCountryResponse()
            })
        }, () => {

        });
    }

    render() {
        return (
            <div id="covid-summary-country"
            >
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
                        <div className="description">
                            <p>In {this.state.model.Country}, {new Date(this.state.model.Date).toLocaleString()}</p>
                        </div>
                        <div className="new-confirmed">
                            <p>New confirmed : {this.state.model.NewConfirmed}</p>
                        </div>
                        <div className="new-deaths">
                            <p>New deaths : {this.state.model.NewDeaths}</p>
                        </div>
                        <div className="new-recovered">
                            <p>New recovered : {this.state.model.NewRecovered}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CovidSummaryCountry;