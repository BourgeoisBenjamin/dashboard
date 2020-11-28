import React, {Component} from "react";
import './WeatherCityMeteo.css'
import history from "../../../../history";
import YoutubeStatisticsChannelService from "../../../../core/services/services/youtube/YoutubeStatisticsChannelService";
import StatisticsChannelModel from "../../../../core/models/services/youtube/response/StatisticsChannelModel";
import ViewImage from '../../../../assets/images/view.png'
import SubscriberImage from '../../../../assets/images/subscriber.png'
import VideosImage from '../../../../assets/images/videos.png'
import "./YoutubeStatisticsChannel.css"
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";
import MenuContext from "../../../../core/contexts/MenuContext";

class YoutubeStatisticsChannel extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsChannelService();

        this.state = {
            model: new StatisticsChannelModel(),
            isLoading: true,
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
    }

    componentDidMount()
    {
        this.getDataWidget();
    }

    getDataWidget(isLoading = true)
    {
        this.setState({
            isLoading: isLoading,
            errorAppear: false
        })
        this.service.get(this.props.id, () => {
            this.setState({
                model: this.service.getResponseModel(),
                isLoading: false
            })
        }, () => {
            if (this.service.getError().response.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                history.push('/');
            }
            this.setState({
                isLoading: false,
                errorMessage: 'Could not load data',
                errorAppear: true
            })
        });
        setTimeout(() => {
            this.getDataWidget(false);
        }, 1800 * 1000);
    }

    render() {
        return (
            <div id="youtube-statistics-channel" class="widget">
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
                            <img src={this.state.model.snippet?.thumbnails.default.url} alt=""/>
                        </div>
                        <div className="name-channel">
                            <p>{this.state.model.snippet?.title}</p>
                        </div>
                    </div>
                    <div className="channel-stats">
                        <div className="stat">
                            <div className="logo">
                                <img src={SubscriberImage} alt="" />
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
                                <img src={VideosImage} alt="" />
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
                                <img src={ViewImage} alt="" />
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
        this.service.delete(this.props.id, () => {
            this.props.onClickDelete();
        }, () => {
            if (this.service.getError().response.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                history.push('/');
            }
        });
    }
}

export default YoutubeStatisticsChannel;