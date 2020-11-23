import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidSummaryCountry.css'
import LocationImage from '../../../../assets/images/placeholder.png'
import history from "../../../../history";
import DeathImage from '../../../../assets/images/death.png'
import RecoveryImage from '../../../../assets/images/recovery.png'
import ConfirmedImage from '../../../../assets/images/confirmed.png'
import SummaryCountryModel from "../../../../core/models/services/covid/response/SummaryCountryModel";

class CovidSummaryCountry extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new SummaryCountryModel()
        }
        this.service = new CovidService();

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters  = this.onClickParameters.bind(this);
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
                        <div className="title">
                            <div class="main-title">
                                <p>COVID 19</p>
                            </div>
                            <div class="second-title">
                                <p>Summary per country</p>
                            </div>
                        </div>
                        <div className="logo-parameters"  onClick={this.onClickParameters}>
                            <FiSettings color="white" size={30}/>
                        </div>
                    </div>
                    <div className="content">
                        <div class="header-content">
                            <div className="description">
                                <div class="logo">
                                    <img src={LocationImage} />
                                </div>
                                <div class="text">
                                    <p>In {this.state.model.Country}, {new Date(this.state.model.Date).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div class="stat-wrap">
                            <div className="stat">
                                <div class="image">
                                    <div class="logo">
                                        <img alt="" src={ConfirmedImage} />
                                    </div>
                                    <div class="description">
                                        <p>New confirmed</p>
                                    </div>
                                </div>
                                <div className="value">
                                    <p>{this.state.model.NewConfirmed}</p>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="image">
                                    <div className="logo">
                                        <img alt="" src={RecoveryImage}/>
                                    </div>
                                    <div className="description">
                                        <p>New recovered</p>
                                    </div>
                                </div>
                                <div class="value">
                                    <p>{this.state.model.NewRecovered}</p>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="image">
                                    <div className="logo">
                                        <img alt="" src={DeathImage}/>
                                    </div>
                                    <div className="description">
                                        <p>New deaths</p>
                                    </div>
                                </div>
                                <div className="value">
                                    <p>{this.state.model.NewDeaths}</p>
                                </div>
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
            pathname: '/home/widget/covid/summary-country/',
            search: '?id=' + this.props.id
        })
    }
}

export default CovidSummaryCountry;