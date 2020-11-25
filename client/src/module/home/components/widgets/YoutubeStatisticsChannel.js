import React, {Component} from "react";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";
import YoutubeStatisticsChannelService from "../../../../core/services/services/youtube/YoutubeStatisticsChannelService";
import StatisticsChannelModel from "../../../../core/models/services/youtube/response/StatisticsChannelModel";
import ViewImage from '../../../../assets/images/view.png'
import SubscriberImage from '../../../../assets/images/subscriber.png'
import VideosImage from '../../../../assets/images/videos.png'
import "./YoutubeStatisticsChannel.css"
import ClipLoader from "react-spinners/ClipLoader";
import {VscRefresh} from "react-icons/vsc";

class YoutubeStatisticsChannel extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsChannelService();

        this.state = {
            model: new StatisticsChannelModel(),
            isLoading: false
        }

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters = this.onClickParameters.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);

        this.getDataWidget();
    }

    getDataWidget()
    {
        this.setState({
            isLoading: true
        })
        this.service.get(this.props.id, () => {
            this.setState({
                model: this.service.getResponseModel(),
                isLoading: false
            })
        }, () => {

        });
    }

    render() {
        return (
            <div id="youtube-statistics-channel">
                <div class="content">
                    <div className="header">
                        <div className="title">
                            <div className="main-title">
                                <p>Youtube</p>
                            </div>
                            <div className="second-title">
                                <p>Statistics of a channel</p>
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
                </div>
                <div className="core" style={{ display: this.state.isLoading ? 'none' : 'block' }}>
                    <div className="channel-description">
                        <div className="logo">
                            <img src={this.state.model.snippet?.thumbnails.default.url} />
                        </div>
                        <div className="name-channel">
                            <p>{this.state.model.snippet?.title}</p>
                        </div>
                    </div>
                    <div className="channel-stats">
                        <div className="stat">
                            <div className="logo">
                                <img src={SubscriberImage} />
                            </div>
                            <div className="title">
                                <p>Subscribers</p>
                            </div>
                            <div className="value">
                                <p>{this.state.model.statistics?.subscriberCount}</p>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="logo">
                                <img src={VideosImage} />
                            </div>
                            <div className="title">
                                <p>Videos count</p>
                            </div>
                            <div className="value">
                                <p>{this.state.model.statistics?.videoCount}</p>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="logo">
                                <img src={ViewImage} />
                            </div>
                            <div className="title">
                                <p>Views count</p>
                            </div>
                            <div className="value">
                                <p>{this.state.model.statistics?.viewCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="loader" style={{ display: (this.state.isLoading ? 'block' : 'none' ) }}>
                    <ClipLoader size={50} />
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