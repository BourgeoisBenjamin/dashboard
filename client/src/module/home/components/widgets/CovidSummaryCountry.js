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
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";

class CovidSummaryCountry extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new SummaryCountryModel(),
            isLoading: true,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new CovidService();

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters  = this.onClickParameters.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.getDataWidget();
    }

    getDataWidget()
    {
        this.setState({
            isLoading: true,
            errorAppear: false
        })
        this.service.getSummaryCountry(this.props.id, () => {
            // console.log( this.service.getDataSummaryCountryResponse());
            this.setState({
                model: this.service.getDataSummaryCountryResponse(),
                isLoading: false
            })
        }, () => {
            this.setState({
                isLoading: false,
                errorMessage: 'Could not load data',
                errorAppear: true
            })
        });
    }

    render() {
        return (
            <div id="covid-summary-country">
                <div className="content">
                    <WidgetHeader
                        mainTitle="COVID 19"
                        secondTitle="Summary of the day per country"
                        onClickRefresh={this.getDataWidget}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                    <div className="content" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
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
                    <WidgetLoader isLoading={this.state.isLoading} />
                    <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
                </div>
            </div>
        );
    }

    onClickDelete()
    {
        this.service.deleteSummaryCountry(this.props.id, () => {
            this.props.onClickDelete();
        }, () => {
        });
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