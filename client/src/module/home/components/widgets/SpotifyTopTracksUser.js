import React, {Component} from "react";
import history from "../../../../history";
import WidgetHeader from "../widget-header/WidgetHeader";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import SpotifyTopTracksUserService from "../../../../core/services/services/spotify/SpotifyTopTracksUserService";
import TopTracksUserModel from "../../../../core/models/services/spotify/response/TopTracksUserModel";
import './SpotifyTopTracksUser.css'

class TwitterLastTweets extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new TopTracksUserModel(),
            isLoading: false,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new SpotifyTopTracksUserService();

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
        this.service.get(this.props.id, () => {
            console.log(this.service.getResponseModel())
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
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/spotify/top-tracks-user/',
            search: '?id=' + this.props.id
        })
    }

    render() {
        return (
            <div id="spotify-top-tracks-user">
                <div className="content">
                    <WidgetHeader
                        mainTitle="Spotify"
                        secondTitle="Top tracks user"
                        onClickRefresh={this.onClickRefresh}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                </div>
                <div className="core" style={{ display: (this.state.isLoading || this.state.errorAppear ? 'none' : 'block' ) }}>

                </div>
                <WidgetLoader isLoading={this.state.isLoading} />
                <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
            </div>
        );
    }

    onClickDelete()
    {
        this.service.delete(this.props.id, () => {
            this.props.onClickDelete();
        }, () => {
        });
    }

    onClickRefresh()
    {
        this.getDataWidget();
    }
}

export default TwitterLastTweets;
