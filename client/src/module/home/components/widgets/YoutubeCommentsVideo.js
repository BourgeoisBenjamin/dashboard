import React, {Component} from "react";
import './YoutubeCommentsVideo.css'
import history from "../../../../history";
import YoutubeCommentsVideoService from "../../../../core/services/services/youtube/YoutubeCommentsVideoService";
import CommentsVideoModel from "../../../../core/models/services/youtube/response/CommentsVideoModel";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";
import LikeImage from '../../../../assets/images/likeThumb.png'
import CommentImage from '../../../../assets/images/comment.png'
import MenuContext from "../../../../core/contexts/MenuContext";

class YoutubeCommentsVideo extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new YoutubeCommentsVideoService();

        this.state = {
            model: new CommentsVideoModel(),
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
            console.log(this.service.getResponseModel());
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
        }, 120000);
    }

    render() {
        const comments = this.initComments();

        return (
            <div id="youtube-comments-video" class="widget">
                <div class="content">
                    <WidgetHeader
                        mainTitle="Youtube"
                        secondTitle="Comments videos"
                        onClickRefresh={this.getDataWidget}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                    <div class="core" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
                        {comments}
                    </div>
                    <WidgetLoader isLoading={this.state.isLoading} />
                    <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
                </div>
            </div>
        );
    }

    initComments()
    {
        let comments = [];

        this.state.model.data.forEach((d) => {

            comments.push(
                <div className="comment">
                    <div class="comment-content">
                        <div class="image-profile">
                            <img src={d.snippet?.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        </div>
                        <div class="text-date">
                            <div class="text">
                                <p>{d.snippet?.topLevelComment.snippet.textDisplay}</p>
                            </div>
                            <div class="date">
                                <p>{new Date(d.snippet?.topLevelComment.snippet.publishedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div class="stats">
                        <div class="core-stats">
                            <div class="comment-count">
                                <div className="logo">
                                    <img alt="" src={CommentImage} />
                                </div>
                                <div className="value">
                                    <p>{d.snippet?.totalReplyCount}</p>
                                </div>
                            </div>
                            <div class="like-count">
                                <div class="logo">
                                    <img alt="" src={LikeImage} />
                                </div>
                                <div class="value">
                                    <p>{d.snippet?.topLevelComment.snippet.likeCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            );
        });
        return comments;
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/youtube/comments-video/',
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

export default YoutubeCommentsVideo;