import React, {Component} from "react";
import './WeatherCityMeteo.css'
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";
import YoutubeCommentsVideoService from "../../../../core/services/services/youtube/YoutubeCommentsVideoService";
import CommentsVideoModel from "../../../../core/models/services/youtube/response/CommentsVideoModel";
import ClipLoader from "react-spinners/ClipLoader";
import {VscRefresh} from "react-icons/vsc";

class YoutubeCommentsVideo extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeCommentsVideoService();

        this.state = {
            model: new CommentsVideoModel(),
            isLoading: false
        }

        let getWidgetsData = this.props.parentState.getWidgetData;

        getWidgetsData.push(() => {
            this.getDataWidget();
        });
        this.props.parentState.setGetWidgetData(getWidgetsData);

        this.onClickParameters = this.onClickParameters.bind(this);
        this.getDataWidget = this.getDataWidget.bind(this);

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
        return (
            <div id="youtube-channel-videos">
                <div class="content">
                    <div class="header">
                        <div class="title">
                            <p>Comments videos</p>
                        </div>
                        <div className="options">
                            <div className="logo-refresh" onClick={this.getDataWidget}>
                                <VscRefresh color="white" size={30} />
                            </div>
                            <div className="logo-parameters" onClick={this.onClickParameters}>
                                <FiSettings color="white" size={30}/>
                            </div>
                        </div>
                    </div>
                    <div class="content" style={{ display: this.state.isLoading ? 'none' : 'block' }}>
                    </div>
                    <div className="loader" style={{ display: (this.state.isLoading ? 'block' : 'none' ) }}>
                        <ClipLoader size={50} />
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