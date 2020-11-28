import React, {Component} from "react";
import history from "../../../../history";
import WidgetHeader from "../widget-header/WidgetHeader";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import SpotifyTopTracksUserService from "../../../../core/services/services/spotify/SpotifyTopTracksUserService";
import TopTracksUserModel from "../../../../core/models/services/spotify/response/TopTracksUserModel";
import './SpotifyTopTracksUser.css'

class SpotifyTopTracksUser extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new TopTracksUserModel(),
            isLoading: true,
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
        }, 3600000);
    }

    onClickParameters()
    {
        history.push({
            pathname: '/home/widget/spotify/top-tracks-user/',
            search: '?id=' + this.props.id
        })
    }

    render() {
        const tracks = this.initTracks();

        return (
            <div id="spotify-top-tracks-user" class="widget">
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
        let i = 1;

        this.state.model.data.forEach((d) => {
            tracks.push(
                <div className="track" onClick={() => {window.open(d.external_urls.spotify, "_blank")}}>
                    <div className="position">
                        <p>{i}</p>
                    </div>
                    <div className="album-image">
                        <img alt="" src={d.album.images[0].url} />
                    </div>
                    <div className="name">
                        <p>{d.name} - {d.artists[0].name}</p>
                    </div>
                </div>
            );
            i++;
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

export default SpotifyTopTracksUser;
