import React, {Component} from "react";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";
import StatisticsVideoModel from "../../../../core/models/services/youtube/response/StatisticsVideoModel";
import YoutubeStatisticsVideoService from "../../../../core/services/services/youtube/YoutubeStatisticsVideoService";
import LikeImage from '../../../../assets/images/likeThumb.png'
import DislikeImage from '../../../../assets/images/dislike.png'
import CommentImage from '../../../../assets/images/comment.png'
import ViewImage from '../../../../assets/images/view.png'
import './YoutubeStatisticsVideo.css'

class YoutubeStatisticsVideo extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsVideoService();

        this.state = {
            model: new StatisticsVideoModel()
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
            this.setState({
                model: this.service.getResponseModel()
            })
        }, () => {

        });
    }

    render() {
        return (
            <div id="youtube-statistics-video">
                <div class="content">
                    <div className="header">
                        <div className="title">
                            <div className="main-title">
                                <p>Youtube</p>
                            </div>
                            <div className="second-title">
                                <p>Statistics of a video</p>
                            </div>
                        </div>
                        <div className="logo-parameters" onClick={this.onClickParameters}>
                            <FiSettings color="white" size={30}/>
                        </div>
                    </div>
                    <div className="core">
                        <div className="video-description">
                            <div className="image">
                                <img src={this.state.model.snippet?.thumbnails.standard.url} />
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
                                            <img src={LikeImage} />
                                        </div>
                                        <div className="value">
                                            <p>{this.state.model.statistics?.likeCount}</p>
                                        </div>
                                    </div>
                                    <div className="dislike">
                                        <div className="logo">
                                            <img src={DislikeImage} />
                                        </div>
                                        <div className="value">
                                            <p>{this.state.model.statistics?.dislikeCount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="logo">
                                        <img src={CommentImage} />
                                    </div>
                                    <div className="value">
                                        <p>{this.state.model.statistics?.commentCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
}

export default YoutubeStatisticsVideo;