import React, {Component} from "react";
import './WeatherCityMeteo.css'
import history from "../../../../history";
import YoutubeChannelVideoService from "../../../../core/services/services/youtube/YoutubeChannelVideoService";
import ChannelVideosModel from "../../../../core/models/services/youtube/response/ChannelVideosModel";
import './YoutubeChannelVideo.css'
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
            this.setState({
                isLoading: false,
                errorMessage: 'Could not load data',
                errorAppear: true
            })
        });
        setTimeout(() => {
            this.getDataWidget(false);
        }, 3600000);
    }

    render() {
        const videos = this.initVideos();

        return (
            <div id="youtube-channel-videos" class="widget">
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
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe
                            width="260"
                            height="200"
                            src={"https://www.youtube.com/embed/" + d.id.videoId}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        >
                        </iframe>
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
        this.service.delete(this.props.id, () => {
            this.props.onClickDelete();
        }, () => {
        });
    }
}

export default YoutubeChannelVideo;