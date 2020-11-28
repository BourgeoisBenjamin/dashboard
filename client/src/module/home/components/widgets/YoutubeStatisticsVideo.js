import React, {Component} from "react";
import './WeatherCityMeteo.css'
import history from "../../../../history";
import StatisticsVideoModel from "../../../../core/models/services/youtube/response/StatisticsVideoModel";
import YoutubeStatisticsVideoService from "../../../../core/services/services/youtube/YoutubeStatisticsVideoService";
import LikeImage from '../../../../assets/images/likeThumb.png'
import DislikeImage from '../../../../assets/images/dislike.png'
import CommentImage from '../../../../assets/images/comment.png'
import ViewImage from '../../../../assets/images/view.png'
import './YoutubeStatisticsVideo.css'
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";

class YoutubeStatisticsVideo extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsVideoService();

        this.state = {
            model: new StatisticsVideoModel(),
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
        }, 1800 * 1000);
    }

    render() {
        return (
            <div id="youtube-statistics-video" class="widget">
                <div class="content">
                    <WidgetHeader
                        mainTitle="Youtube"
                        secondTitle="Statistics of a video"
                        onClickRefresh={this.getDataWidget}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                    <div className="core" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
                        <div className="video-description">
                            <div className="image">
                                <img src={this.state.model.snippet?.thumbnails.standard.url} alt="" />
                            </div>
                            <div className="name-video">
                                <p>{this.state.model.snippet?.title}</p>
                            </div>
                        </div>
                        <div className="channel-stats">
                            <div className="up-stat">
                                <div className="date">
                                    <p>{new Date(this.state.model.snippet?.publishedAt).toLocaleDateString()}</p>
                                </div>
                                <div className="view-count">
                                    <div className="logo">
                                        <img alt="" src={ViewImage} />
                                    </div>
                                    <div className="value">
                                        <p>{this.state.model.statistics?.viewCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="down-stat">
                                <div className="like-dislike">
                                    <div className="like">
                                        <div className="logo">
                                            <img src={LikeImage} alt="" />
                                        </div>
                                        <div className="value">
                                            <p>{this.state.model.statistics?.likeCount}</p>
                                        </div>
                                    </div>
                                    <div className="dislike">
                                        <div className="logo">
                                            <img src={DislikeImage} alt="" />
                                        </div>
                                        <div className="value">
                                            <p>{this.state.model.statistics?.dislikeCount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="logo">
                                        <img src={CommentImage} alt="" />
                                    </div>
                                    <div className="value">
                                        <p>{this.state.model.statistics?.commentCount}</p>
                                    </div>
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

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/youtube/statistics-video/',
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

export default YoutubeStatisticsVideo;