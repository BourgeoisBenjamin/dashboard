import React, {Component} from "react";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import SelectInput from "../../../../shared/components/inputs/SelectInput";
import SpotifyTopArtistsUserService from "../../../../core/services/services/spotify/SpotifyTopArtistsUserService";
import queryString from "query-string";
import TopArtistsUserModel from "../../../../core/models/services/spotify/request/TopArtistsUserModel";
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

class SpotifyTopArtistsUserForm extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new SpotifyTopArtistsUserService();

        this.state = {
            limitArtists: '',
            timeRange: ''
        }
        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleLimitArtistsChange = this.handleLimitArtistsChange.bind(this);
        this.handleSelectTimeRangeChange = this.handleSelectTimeRangeChange.bind(this);

        this.getWidgetData();
    }

    onClickUpdateWidget(onSuccess, onFailure)
    {
        let params = queryString.parse(window.location.search);
        let model = new TopArtistsUserModel();

        model.limit_artists = parseInt(this.state.limitArtists);
        model.time_range = timeRangeValue[this.state.timeRange];

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
        let model = new TopArtistsUserModel();

        model.limit_artists = parseInt(this.state.limitArtists);
        model.time_range = timeRangeValue[this.state.timeRange];

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
                    limitArtists: this.service.getRequestModel().limit_artists,
                    timeRange: timeRangeRequests[this.service.getRequestModel().time_range]
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
                    <NumberInput name="Limit artists" value={this.state.limitArtists}
                                 onChange={this.handleLimitArtistsChange}/>
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

    handleLimitArtistsChange(e)
    {
        if (!isNaN(e.target.value)) {
            this.setState({
                limitArtists: e.target.value
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

export default SpotifyTopArtistsUserForm;