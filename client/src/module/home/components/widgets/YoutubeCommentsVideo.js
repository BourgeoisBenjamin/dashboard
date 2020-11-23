import React, {Component} from "react";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";
import YoutubeCommentsVideoService from "../../../../core/services/services/youtube/YoutubeCommentsVideoService";
import CommentsVideoModel from "../../../../core/models/services/youtube/response/CommentsVideoModel";

class YoutubeCommentsVideo extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeCommentsVideoService();

        this.state = {
            model: new CommentsVideoModel()
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
            console.log( this.service.getResponseModel());
            this.setState({
                model: this.service.getResponseModel()
            })
        }, () => {

        });
    }

    render() {
        return (
            <div id="youtube-channel-videos">
                <div class="content">
                    <div class="header">
                        <div class="title">
                            <p>Comments videos</p>
                        </div>
                        <div class="logo-parameters" onClick={this.onClickParameters}>
                            <FiSettings color="black" size={30} />
                        </div>
                    </div>
                    <div class="content">
                    </div>
                </div>
            </div>
        );
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/youtube/comments-video/',
            search: '?id=' + this.props.id
        })
    }
}

export default YoutubeCommentsVideo;