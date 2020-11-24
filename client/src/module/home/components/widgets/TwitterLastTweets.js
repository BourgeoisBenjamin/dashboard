import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import './CovidCountryCase.css'
import history from "../../../../history";
import LastTweetsModel from "../../../../core/models/services/twitter/response/LastTweetsModel";
import TwitterService from "../../../../core/services/services/TwitterService";
import CommentImage from '../../../../assets/images/comment.png'
import LikeImage from '../../../../assets/images/like.png'
import RetweetImage from '../../../../assets/images/retweet.png'
import './TwitterLastTweets.css'

class TwitterLastTweets extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new LastTweetsModel()
        }
        this.service = new TwitterService();

        this.onClickParameters = this.onClickParameters.bind(this);

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.getDataWidget();
    }

    getDataWidget()
    {
        console.log('hey');
        this.service.getLastTweets(this.props.id, () => {
            console.log( this.service.getLastTweetModelResponse());
            this.setState({
                model: this.service.getLastTweetModelResponse()
            })
        }, () => {
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
                    <div className="header">
                        <div className="title">
                            <div className="main-title">
                                <p>Twitter</p>
                            </div>
                            <div className="second-title">
                                <p>Last tweets</p>
                            </div>
                        </div>
                        <div className="logo-parameters" onClick={this.onClickParameters}>
                            <FiSettings color="white" size={30}/>
                        </div>
                    </div>
                </div>
                <div className="core">
                    { tweets }
                </div>
            </div>
        );
    }

    initTweets()
    {
        let tweets = [];

        this.state.model.data.forEach((d) => {
            console.log(d);
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
