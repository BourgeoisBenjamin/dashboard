import React, {Component} from "react";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";
import YoutubeChannelVideoService from "../../../../core/services/services/youtube/YoutubeChannelVideoService";
import ChannelVideosModel from "../../../../core/models/services/youtube/response/ChannelVideosModel";

class YoutubeChannelVideo extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeChannelVideoService();

        this.state = {
            model: new ChannelVideosModel()
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
                            <p>Channel videos</p>
                        </div>
                        <div class="logo-parameters" onClick={this.onClickParameters}>
                            <FiSettings color="white" size={30} />
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
            pathname: '/home/widget/youtube/channel-videos/',
            search: '?id=' + this.props.id
        })
    }
}

export default YoutubeChannelVideo;