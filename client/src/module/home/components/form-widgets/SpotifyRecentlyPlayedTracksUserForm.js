import React, {Component} from "react";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import queryString from "query-string";
import RecentlyPlayedTracksUserModel
    from "../../../../core/models/services/spotify/request/RecentlyPlayedTracksUserModel";
import SpotifyRecentlyPlayedTracksUserService
    from "../../../../core/services/services/spotify/SpotifyRecentlyPlayedTracksUserService";
import history from "../../../../history";
import MenuContext from "../../../../core/contexts/MenuContext";

class SpotifyRecentlyPlayedTracksUserForm extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new SpotifyRecentlyPlayedTracksUserService();

        this.state = {
            limitTracks: ''
        }
        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleLimitTracksChange = this.handleLimitTracksChange.bind(this);

        this.getWidgetData();
    }

    onClickUpdateWidget(onSuccess, onFailure)
    {
        let params = queryString.parse(window.location.search);
        let model = new RecentlyPlayedTracksUserModel();

        model.limit_tracks = parseInt(this.state.limitTracks);

        this.props.parentState.setDisplayLoader(true);

        this.service.put(model, params.id, () => {
            this.props.parentState.setDisplayLoader(false);
            onSuccess();
            this.props.onClickUpdate();
        }, () => {
            if (this.service.getError().response?.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                history.push('/');
            }
            this.props.parentState.setDisplayLoader(false);
            onFailure();
        });
    }

    onClickAddWidget(onSuccess, onFailure)
    {
        let model = new RecentlyPlayedTracksUserModel();

        model.limit_tracks = parseInt(this.state.limitTracks);

        this.props.parentState.setDisplayLoader(true);

        this.service.post(model, () => {
            this.props.parentState.setDisplayLoader(false);
            onSuccess();
            this.props.onClickUpdate();
        }, () => {
            if (this.service.getError().response?.status === 403) {
                localStorage.removeItem('JWTToken');
                this.context.setShowMenu('none');
                history.push('/');
            }
            this.props.parentState.setDisplayLoader(false);
            onFailure();
        });
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.getParams(params.id, () => {
                this.setState({
                    limitTracks: this.service.getRequestModel().limit_tracks
                })
            }, () => {
                if (this.service.getError().response?.status === 403) {
                    localStorage.removeItem('JWTToken');
                    this.context.setShowMenu('none');
                    history.push('/');
                }
            });
        }
    }

    render() {
        return (
            <div className="widget-form">
                <div className="input-parameters">
                    <NumberInput name="Limit tracks" value={this.state.limitTracks}
                                 onChange={this.handleLimitTracksChange}/>
                </div>
            </div>
        );
    }

    handleLimitTracksChange(e)
    {
        if (!isNaN(e.target.value)) {
            this.setState({
                limitTracks: e.target.value
            })
        }
    }
}

export default SpotifyRecentlyPlayedTracksUserForm;