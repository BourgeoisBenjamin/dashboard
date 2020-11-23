import React, {Component} from "react";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";
import YoutubeCommentsVideoService from "../../../../core/services/services/youtube/YoutubeCommentsVideoService";
import CommentsVideoModel from "../../../../core/models/services/youtube/response/CommentsVideoModel";
import YoutubeStatisticsChannelService
    from "../../../../core/services/services/youtube/YoutubeStatisticsChannelService";
import StatisticsChannelModel from "../../../../core/models/services/youtube/response/StatisticsChannelModel";

class YoutubeStatisticsChannel extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsChannelService();

        this.state = {
            model: new StatisticsChannelModel()
        }

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters = this.onClickParameters.bind(this);

        this.getDataWidget();
    }

    getDataWidget()
    {
        this.service.get(this.props.id, () => {
            console.log( this.service.getResponseModel());
            this.setState({
                model: this.service.getResponseModel()
            })
        }, () => {

        });
    }

    render() {
        return (
            <div id="youtube-channel-videos">
                <div class="content">
                    <div class="header">
                        <div class="title">
                            <p>Statistics channels</p>
                        </div>
                        <div class="logo-parameters" onClick={this.onClickParameters}>
                            <FiSettings color="black" size={30} />
                        </div>
                    </div>
                    <div class="content">
                    </div>
                </div>
            </div>
        );
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/youtube/statistics-channel/',
            search: '?id=' + this.props.id
        })
    }
}

export default YoutubeStatisticsChannel;