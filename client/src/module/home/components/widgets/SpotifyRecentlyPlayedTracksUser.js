import React, {Component} from "react";
import history from "../../../../history";
import WidgetHeader from "../widget-header/WidgetHeader";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import './SpotifyRecentlyPlayedTracksUser.css'
import RecentlyPlayedTracksUserModel from "../../../../core/models/services/spotify/response/RecentlyPlayedTracksUserModel";
import SpotifyRecentlyPlayedTracksUserService
    from "../../../../core/services/services/spotify/SpotifyRecentlyPlayedTracksUserService";

class SpotifyRecentlyPlayedTracksUser extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new RecentlyPlayedTracksUserModel(),
            isLoading: false,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new SpotifyRecentlyPlayedTracksUserService();

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
            pathname: '/home/widget/spotify/recently-played-tracks-user/',
            search: '?id=' + this.props.id
        })
    }

    render() {
        const tracks = this.initTracks();

        return (
            <div id="spotify-recently-played-tracks-user">
                <div className="content">
                    <WidgetHeader
                        mainTitle="Spotify"
                        secondTitle="Recently played tracks"
                        onClickRefresh={this.onClickRefresh}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                </div>
                <div className="core" style={{ display: (this.state.isLoading || this.state.errorAppear ? 'none' : 'block' ) }}>
                    {tracks}
                </div>
                <WidgetLoader isLoading={this.state.isLoading} />
                <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
            </div>
        );
    }

    initTracks()
    {
        let tracks = [];

        this.state.model.data.forEach((d) => {
            tracks.push(
                <div className="track">
                    <div className="song">
                        <iframe
                            src={"https://open.spotify.com/embed/album/" + d.track.album.id} width="300" height="151"
                                frameBorder="0" allowTransparency="true" allow="encrypted-media">
                        </iframe>
                    </div>
                </div>
            );
        });
        return tracks;
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

export default SpotifyRecentlyPlayedTracksUser;