import React, {Component} from "react";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";
import YoutubeChannelVideoService from "../../../../core/services/services/youtube/YoutubeChannelVideoService";
import ChannelVideosModel from "../../../../core/models/services/youtube/response/ChannelVideosModel";
import './YoutubeChannelVideo.css'
import ClipLoader from "react-spinners/ClipLoader";
import {VscRefresh} from "react-icons/vsc";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";

class YoutubeChannelVideo extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeChannelVideoService();

        this.state = {
            model: new ChannelVideosModel(),
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
        const videos = this.initVideos();

        return (
            <div id="youtube-channel-videos">
                <div class="content">
                    <WidgetHeader
                        mainTitle="Youtube"
                        secondTitle="Channels videos"
                        onClickRefresh={this.getDataWidget}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                    <div class="core" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
                        { videos }
                    </div>
                    <WidgetLoader isLoading={this.state.isLoading} />
                    <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
                </div>
            </div>
        );
    }

    initVideos()
    {
        let videos = [];

        this.state.model.data.forEach((d) => {

            videos.push(
                <div className="video">
                    <div className="image">
                        <img src={d.snippet?.thumbnails.high.url} alt="" />
                    </div>
                    <div className="title">
                        <p>{d.snippet.title}</p>
                    </div>
                    <div className="date">
                        <p>{new Date(d.snippet.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <hr/>
                </div>
            );
        });
        return videos;
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/youtube/channel-videos/',
            search: '?id=' + this.props.id
        })
    }

    onClickDelete()
    {

    }
}

export default YoutubeChannelVideo;