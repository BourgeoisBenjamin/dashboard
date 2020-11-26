import React, {Component} from "react";
import history from "../../../../history";
import WidgetHeader from "../widget-header/WidgetHeader";
import WidgetLoader from "../widget-loader/WidgetLoader";
import WidgetError from "../widget-error/WidgetError";
import TopArtistsUserModel from "../../../../core/models/services/spotify/response/TopArtistsUserModel";
import SpotifyTopArtistsUserService from "../../../../core/services/services/spotify/SpotifyTopArtistsUserService";
import './SpotifyTopArtistsUser.css'

class SpotifyTopArtistsUser extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            model: new TopArtistsUserModel(),
            isLoading: false,
            errorMessage: '',
            errorAppear: false
        }
        this.service = new SpotifyTopArtistsUserService();

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
            pathname: '/home/widget/spotify/top-artists-user/',
            search: '?id=' + this.props.id
        })
    }

    render() {
        const artists = this.initArtists();

        return (
            <div id="spotify-top-artists-user">
                <div className="content">
                    <WidgetHeader
                        mainTitle="Spotify"
                        secondTitle="Top artists user"
                        onClickRefresh={this.onClickRefresh}
                        onClickDelete={this.onClickDelete}
                        onClickSettings={this.onClickParameters}
                    />
                </div>
                <div className="core" style={{ display: (this.state.isLoading || this.state.errorAppear ? 'none' : 'block' ) }}>
                    {artists}
                </div>
                <WidgetLoader isLoading={this.state.isLoading} />
                <WidgetError appear={this.state.errorAppear} message={this.state.errorMessage} />
            </div>
        );
    }

    initArtists()
    {
        let artists = [];
        let i = 1;

        this.state.model.data.forEach((d) => {
            const genres = this.initGenres(d.genres);

            artists.push(
                <div className="artist">
                    <div className="first-content">
                        <div className="position">
                            <p>{i}</p>
                        </div>
                        <div className="image-profile">
                            <img alt="" src={d.images[0].url} />
                        </div>
                        <div className="name">
                            <p>{d.name}</p>
                        </div>
                        <div className="followers">
                            <p>{d.followers.total} followers</p>
                        </div>
                    </div>
                    <div className="genres">
                        {genres}
                    </div>
                    <hr/>
                </div>
            );
            i++;
        });
        return artists;
    }

    initGenres(gnr)
    {
        let genres = [];

        gnr.forEach((g) => {
            genres.push(
                <div className="genre">
                    <div className="text">
                        <p>{g}</p>
                    </div>
                </div>
            );
        });
        return genres;
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

export default SpotifyTopArtistsUser;