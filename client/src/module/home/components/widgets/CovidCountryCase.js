import React, {Component} from "react";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidCountryCase.css'
import LocationImage from '../../../../assets/images/placeholder.png'
import DeathImage from '../../../../assets/images/death.png'
import RecoveryImage from '../../../../assets/images/recovery.png'
import ConfirmedImage from '../../../../assets/images/confirmed.png'
import history from "../../../../history";
import WidgetHeader from "../widget-header/WidgetHeader";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";

class CovidCountryCase extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new CountryCaseModel(),
            isLoading: false,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new CovidService();

        this.onClickSettings = this.onClickSettings.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.getDataWidget();
    }

    getDataWidget()
    {
        this.setState({
            isLoading: true,
            errorAppear: false
        })
        this.service.getCountryCase(this.props.id, () => {
            // console.log( this.service.getDataCountryCaseResponse());
            this.setState({
                model: this.service.getDataCountryCaseResponse(),
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

    onClickSettings(event)
    {
        history.push({
            pathname: '/home/widget/covid/country-case/',
            search: '?id=' + this.props.id
        });
    }

    onClickDelete()
    {

    }

    render() {
        return (
            <div id="covid-country-case">
                <div className="content">
                    <WidgetHeader mainTitle="COVID 19" secondTitle="Country case" onClickRefresh={this.getDataWidget} onClickDelete={this.onClickDelete} onClickSettings={this.onClickSettings} />
                    <div className="content" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
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
                    <WidgetLoader isLoading={this.state.isLoading} />
                    <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
                </div>
            </div>
        );
    }
}

export default CovidCountryCase;
