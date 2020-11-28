import React, {Component} from "react";
import queryString from "query-string";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import YoutubeStatisticsChannelService from "../../../../core/services/services/youtube/YoutubeStatisticsChannelService";
import StatisticsChannelModel from "../../../../core/models/services/youtube/request/StatisticsChannelModel";
import history from "../../../../history";

class YoutubeStatisticsChannelForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsChannelService();

        this.state = {
            idChannel: ''
        }

        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleIdChannelChange = this.handleIdChannelChange.bind(this);

        this.getWidgetData();
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.getParams(params.id, () => {
                this.setState({
                    idChannel: this.service.getRequestModel().id_channel,
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

    onClickUpdateWidget(onSuccess, onFailure)
    {
        let params = queryString.parse(window.location.search);
        let model = new StatisticsChannelModel();

        model.id_channel = this.state.idChannel;

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
        let model = new StatisticsChannelModel();

        model.id_channel = this.state.idChannel;

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

    render() {
        return (
            <div class="widget-form">
                <div className="input-parameters">
                    <NumberInput name="Id Channel" value={this.state.idChannel} onChange={this.handleIdChannelChange} />
                </div>
            </div>
        );
    }

    handleIdChannelChange(e)
    {
        this.setState({
            idChannel: e.target.value
        });
    }
}

export default YoutubeStatisticsChannelForm;