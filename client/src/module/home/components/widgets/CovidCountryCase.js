import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidCountryCase.css'
import CovidImage from '../../../../assets/images/covid.png'
import history from "../../../../history";

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
            console.log( this.service.getDataCountryCaseResponse());
            this.setState({
                model: this.service.getDataCountryCaseResponse()
            })
        }, () => {

        });
    }

    onClickParameters()
    {
        // history.push('/home/widget/covid/country-case/' + this.props.id);
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
                        <div className="covid-logo">
                            <img src={CovidImage} />
                        </div>
                        <div className="title">
                            <p>Case per country</p>
                        </div>
                        <div className="logo-parameters" onClick={this.onClickParameters}>
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
