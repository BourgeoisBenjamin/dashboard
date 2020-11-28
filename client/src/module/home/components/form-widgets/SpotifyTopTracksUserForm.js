import React, {Component} from "react";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import SelectInput from "../../../../shared/components/inputs/SelectInput";
import SpotifyTopTracksUserService from "../../../../core/services/services/spotify/SpotifyTopTracksUserService";
import queryString from "query-string";
import TopTracksUserModel from "../../../../core/models/services/spotify/request/TopTracksUserModel";
import history from "../../../../history";
import MenuContext from "../../../../core/contexts/MenuContext";

const timeRange = [
    {
        name: 'Several years',
    },
    {
        name: 'Last 6 months',
    },
    {
        name: 'Last 4 weeks',
    }
];

const timeRangeValue = {
    'Several years' : 'long_term',
    'Last 6 months': 'medium_term',
    'Last 4 weeks' : 'short_term'
};

const timeRangeRequests = {
    'long_term' : 'Several years',
    'medium_term': 'Last 6 months',
    'short_term': 'Last 4 weeks'
};

class SpotifyTopTracksUserForm extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new SpotifyTopTracksUserService();

        this.state = {
            limitTracks: '',
            timeRange: ''
        }

        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleLimitTracksChange = this.handleLimitTracksChange.bind(this);
        this.handleSelectTimeRangeChange = this.handleSelectTimeRangeChange.bind(this);

        this.getWidgetData();
    }

    onClickUpdateWidget(onSuccess, onFailure)
    {
        let params = queryString.parse(window.location.search);
        let model = new TopTracksUserModel();

        model.limit_tracks = parseInt(this.state.limitTracks);
        model.time_range = timeRangeValue[this.state.timeRange];

        this.props.parentState.setDisplayLoader(true);

        this.service.put(model, params.id, () => {
            this.props.parentState.setDisplayLoader(false);
            onSuccess();
            this.props.onClickUpdate();
        }, () => {
            if (this.service.getError().response.status === 403) {
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
        let model = new TopTracksUserModel();

        model.limit_tracks = parseInt(this.state.limitTracks);
        model.time_range = timeRangeValue[this.state.timeRange];

        this.props.parentState.setDisplayLoader(true);

        this.service.post(model, () => {
            this.props.parentState.setDisplayLoader(false);
            onSuccess();
            this.props.onClickUpdate();
        }, () => {
            if (this.service.getError().response.status === 403) {
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
                    limitTracks: this.service.getRequestModel().limit_tracks,
                    timeRange: timeRangeRequests[this.service.getRequestModel().time_range]
                })
            }, () => {
                if (this.service.getError().response.status === 403) {
                    localStorage.removeItem('JWTToken');
                    this.context.setShowMenu('none');
                    history.push('/');
                }
            });
        }
    }

    render() {
        return (
            <div class="widget-form">
                <div className="input-parameters">
                    <NumberInput name="Limit tracks" value={this.state.limitTracks} onChange={this.handleLimitTracksChange} />
                </div>
                <div className="input-parameters">
                    <SelectInput
                        label="Time range" value={this.state.timeRange} onChange={this.handleSelectTimeRangeChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Select a service</em>;
                            }
                            return selected;
                        }}
                        name="Time range" arrayKey="name" arrayValue="name" array={timeRange}
                    />
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

    handleSelectTimeRangeChange(e)
    {
        this.setState({
            timeRange: e.target.value
        })
    }
}

export default SpotifyTopTracksUserForm;