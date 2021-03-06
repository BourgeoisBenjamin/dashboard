import React, {Component} from "react";
import history from "../../../../history";
import WidgetHeader from "../widget-header/WidgetHeader";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import './SpotifyRecentlyPlayedTracksUser.css'
import RecentlyPlayedTracksUserModel from "../../../../core/models/services/spotify/response/RecentlyPlayedTracksUserModel";
import SpotifyRecentlyPlayedTracksUserService
    from "../../../../core/services/services/spotify/SpotifyRecentlyPlayedTracksUserService";
import MenuContext from "../../../../core/contexts/MenuContext";

class SpotifyRecentlyPlayedTracksUser extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.state = {
            model: new RecentlyPlayedTracksUserModel(),
            isLoading: true,
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
        });
        this.service.get(this.props.id, () => {
            console.log(this.service.getResponseModel())
            this.setState({
                model: this.service.getResponseModel(),
                isLoading: false
            })
        }, () => {
            if (this.service.getError().response?.status === 403) {
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
        }, 300000);
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
            <div id="spotify-recently-played-tracks-user" className="widget">
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
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe
                            src={"https://open.spotify.com/embed/track/" + d.track.id} width="300" height="90"
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
            if (this.service.getError().response?.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                history.push('/');
            }
        });
    }

    onClickRefresh()
    {
        this.getDataWidget();
    }
}

export default SpotifyRecentlyPlayedTracksUser;