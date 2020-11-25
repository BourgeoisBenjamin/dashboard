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
import ClipLoader from "react-spinners/ClipLoader";
import {VscRefresh} from "react-icons/vsc";

class CovidSummaryCountry extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new SummaryCountryModel(),
            isLoading: false
        }
        this.service = new CovidService();

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters  = this.onClickParameters.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);
        this.getDataWidget();
    }

    getDataWidget()
    {
        this.setState({
            isLoading: true
        })
        this.service.getSummaryCountry(this.props.id, () => {
            // console.log( this.service.getDataSummaryCountryResponse());
            this.setState({
                model: this.service.getDataSummaryCountryResponse(),
                isLoading: false
            })
        }, () => {

        });
    }

    render() {
        return (
            <div id="covid-summary-country">
                <div className="content">
                    <div className="header">
                        <div className="title">
                            <div class="main-title">
                                <p>COVID 19</p>
                            </div>
                            <div class="second-title">
                                <p>Summary of the day per country</p>
                            </div>
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
                    <div className="content" style={{ display: this.state.isLoading ? 'none' : 'block' }}>
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
            pathname: '/home/widget/covid/summary-country/',
            search: '?id=' + this.props.id
        })
    }
}

export default CovidSummaryCountry;