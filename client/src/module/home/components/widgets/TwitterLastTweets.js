import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import CountryCaseModel from "../../../../core/models/services/covid/response/CountryCaseModel";
import CovidService from "../../../../core/services/services/CovidService";
import './CovidCountryCase.css'
import CovidImage from '../../../../assets/images/covid.png'
import history from "../../../../history";
import LastTweetsModel from "../../../../core/models/services/twitter/response/LastTweetsModel";
import TwitterService from "../../../../core/services/services/TwitterService";

class TwitterLastTweets extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new LastTweetsModel()
        }
        this.service = new TwitterService();

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
        console.log('hey');
        this.service.getLastTweets(this.props.id, () => {
            console.log( this.service.getLastTweetModelResponse());
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
            pathname: '/home/widget/twitter/last-tweets/',
            search: '?id=' + this.props.id
        })
    }

    render() {
        return (
            <div id="covid-country-case">
                <div className="content">
                    <div className="header">
                        <div className="covid-logo">
                            <img  />
                        </div>
                        <div className="title">
                            <p>Last tweets</p>
                        </div>
                        <div className="logo-parameters" onClick={this.onClickParameters}>
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

export default TwitterLastTweets;
