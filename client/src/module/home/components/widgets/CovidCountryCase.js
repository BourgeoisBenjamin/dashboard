import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidCountryCase.css'
import LocationImage from '../../../../assets/images/placeholder.png'
import DeathImage from '../../../../assets/images/death.png'
import RecoveryImage from '../../../../assets/images/recovery.png'
import ConfirmedImage from '../../../../assets/images/confirmed.png'
import history from "../../../../history";
import HumidityImage from "../../../../assets/images/humidity.png";

class CovidCountryCase extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new CountryCaseModel()
        }
        this.service = new CovidService();

        this.onClickParameters = this.onClickParameters.bind(this);

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.getDataWidget();
    }

    getDataWidget()
    {
        this.service.getCountryCase(this.props.id, () => {
            // console.log( this.service.getDataCountryCaseResponse());
            this.setState({
                model: this.service.getDataCountryCaseResponse()
            })
        }, () => {

        });
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/covid/country-case/',
            search: '?id=' + this.props.id
        })
    }

    render() {
        return (
            <div id="covid-country-case">
                <div className="content">
                    <div className="header">
                        <div className="title">
                            <div className="main-title">
                                <p>COVID 19</p>
                            </div>
                            <div className="second-title">
                                <p>Summary per country</p>
                            </div>
                        </div>
                        <div className="logo-parameters" onClick={this.onClickParameters}>
                            <FiSettings color="white" size={30}/>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header-content">
                            <div className="description">
                                <div className="logo">
                                    <img src={LocationImage}/>
                                </div>
                                <div className="text">
                                    <p>In {this.state.model.Country}, {new Date(this.state.model.Date).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="wrap-elements">
                            <div className="element">
                                <div className="icon">
                                    <img alt="" src={ConfirmedImage}/>
                                </div>
                                <div className="description">
                                    <p>Total confirmed</p>
                                </div>
                                <div className="value">
                                    <p>{this.state.model.Confirmed}</p>
                                </div>
                            </div>
                            <div className="element">
                                <div className="icon">
                                    <img alt="" src={RecoveryImage}/>
                                </div>
                                <div className="description">
                                    <p>Total recovered</p>
                                </div>
                                <div className="value">
                                    <p>{this.state.model.Recovered}</p>
                                </div>
                            </div>
                            <div className="element">
                                <div className="icon">
                                    <img alt="" src={DeathImage}/>
                                </div>
                                <div className="description">
                                    <p>Total deaths</p>
                                </div>
                                <div className="value">
                                    <p>{this.state.model.Deaths}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CovidCountryCase;
