import React, {Component} from "react";
import './CovidCountryCase.css'
import history from "../../../../history";
import LastTweetsModel from "../../../../core/models/services/twitter/response/LastTweetsModel";
import TwitterService from "../../../../core/services/services/TwitterService";
import LikeImage from '../../../../assets/images/like.png'
import RetweetImage from '../../../../assets/images/retweet.png'
import './TwitterLastTweets.css'
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import WidgetHeader from "../widget-header/WidgetHeader";

class TwitterLastTweets extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new LastTweetsModel(),
            isLoading: true,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new TwitterService();

        this.onClickParameters = this.onClickParameters.bind(this);
        this.onClickRefresh = this.onClickRefresh.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.getDataWidget();
    }

    getDataWidget()
    {
        this.setState({
            isLoading: true,
            errorAppear: false
        });
        this.service.getLastTweets(this.props.id, () => {
            this.setState({
                model: this.service.getLastTweetModelResponse(),
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

    onClickParameters()
    {
        // history.push('/home/widget/covid/country-case/' + this.props.id);
        history.push({
            pathname: '/home/widget/twitter/last-tweets/',
            search: '?id=' + this.props.id
        })
    }

    render() {
        const tweets = this.initTweets();

        return (
            <div id="twitter-last-tweets">
                <div className="content">
                    <WidgetHeader
                        mainTitle="Twitter"
                        secondTitle="Last tweets"
                        onClickRefresh={this.onClickRefresh}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                </div>
                <div className="core" style={{ display: (this.state.isLoading || this.state.errorAppear ? 'none' : 'block' ) }}>
                    { tweets }
                </div>
                <WidgetLoader isLoading={this.state.isLoading} />
                <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
            </div>
        );
    }

    onClickDelete()
    {
        this.service.deleteLastTweet(this.props.id, () => {
            this.props.onClickDelete();
        }, () => {
        });
    }

    onClickRefresh()
    {
        this.getDataWidget();
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

export default TwitterLastTweets;
