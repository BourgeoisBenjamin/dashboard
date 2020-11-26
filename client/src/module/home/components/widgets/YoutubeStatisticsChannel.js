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
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";

class YoutubeStatisticsChannel extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsChannelService();

        this.state = {
            model: new StatisticsChannelModel(),
            isLoading: false,
            errorMessage: '',
            errorAppear: false
        }

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters = this.onClickParameters.bind(this);
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
        this.service.get(this.props.id, () => {
            this.setState({
                model: this.service.getResponseModel(),
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
            <div id="youtube-statistics-channel">
                <WidgetHeader
                    mainTitle="Youtube"
                    secondTitle="Statistics of a channel"
                    onClickRefresh={this.getDataWidget}
                    onClickDelete={this.onClickDelete}
                    onClickSettings={this.onClickParameters}
                />
                <div className="core" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
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
                <WidgetLoader isLoading={this.state.isLoading} />
                <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
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

    onClickDelete()
    {

    }
}

export default YoutubeStatisticsChannel;