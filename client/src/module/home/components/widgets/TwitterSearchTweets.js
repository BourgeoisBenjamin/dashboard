import React, {Component} from "react";
import './TwitterSearchTweets.css'
import history from "../../../../history";
import SearchTweetsModel from "../../../../core/models/services/twitter/response/SearchTweetsModel";
import RetweetImage from "../../../../assets/images/retweet.png";
import LikeImage from "../../../../assets/images/like.png";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";
import TwitterSearchTweetsService from "../../../../core/services/services/twitter/TwitterSearchTweetsService";

class TwitterSearchTweets extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new SearchTweetsModel(),
            isLoading: true,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new TwitterSearchTweetsService();

        this.onClickParameters = this.onClickParameters.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);
        this.getDataWidget = this.getDataWidget.bind(this);

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
        }, 30000);
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/twitter/search-tweets/',
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

    render() {
        const tweets = this.initTweets();

        return (
            <div id="twitter-search-tweets" class="widget">
                <div className="content">
                    <WidgetHeader
                        mainTitle="Twitter"
                        secondTitle="Search tweets"
                        onClickRefresh={this.getDataWidget}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                </div>
                <div className="core" style={{ display: this.state.isLoading || this.state.errorAppear ? 'none' : 'block' }}>
                    { tweets }
                </div>
                <WidgetLoader isLoading={this.state.isLoading} />
                <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
            </div>
        );
    }

    initTweets()
    {
        let tweets = [];

        this.state.model.data.forEach((d) => {
            tweets.push(
                <div className="tweet">
                    <div className="text">
                        <p>{d.text}</p>
                    </div>
                    <div className="date">
                        <p>{new Date(d.created_at).toLocaleString()}</p>
                    </div>
                    <div className="stats">
                        {/*<div className="comments stat">*/}
                        {/*    <div className="logo">*/}
                        {/*        <img alt="" src={CommentImage} />*/}
                        {/*    </div>*/}
                        {/*    <div className="value">*/}
                        {/*        <p>1</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="retweet stat">
                            <div className="logo">
                                <img alt="" src={RetweetImage} />
                            </div>
                            <div className="value">
                                <p>{d.retweet_count}</p>
                            </div>
                        </div>
                        <div className="like stat">
                            <div className="logo">
                                <img alt="" src={LikeImage} />
                            </div>
                            <div className="value">
                                <p>{d.favorite_count}</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        })
        return (tweets);
    }
}

export default TwitterSearchTweets;