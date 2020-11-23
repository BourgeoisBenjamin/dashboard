import React, {Component} from "react";
import queryString from "query-string";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import YoutubeStatisticsChannelService from "../../../../core/services/services/youtube/YoutubeStatisticsChannelService";
import StatisticsVideoModel from "../../../../core/models/services/youtube/request/StatisticsVideoModel";

class YoutubeStatisticsVideoForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsChannelService();

        this.state = {
            idVideo: ''
        }

        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleIdVideoChange = this.handleIdVideoChange.bind(this);

        this.getWidgetData();
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.get(params.id, () => {
                this.setState({
                    idVideo: this.service.getRequestModel().id_video,
                })
            }, () => {

            });
        }
    }

    onClickUpdateWidget(onSuccess, onFailure)
    {
        let params = queryString.parse(window.location.search);
        let model = new StatisticsVideoModel();

        model.id_video = parseInt(this.state.idVideo);

        this.props.parentState.setDisplayLoader(true);

        this.service.put(model, params.id, () => {
            this.props.parentState.setDisplayLoader(false);
            onSuccess();
            this.props.onClickUpdate();
        }, () => {
            this.props.parentState.setDisplayLoader(false);
            onFailure();
        });
    }

    onClickAddWidget(onSuccess, onFailure)
    {
        let model = new StatisticsVideoModel();

        model.id_video = parseInt(this.state.idVideo);

        this.props.parentState.setDisplayLoader(true);

        this.service.post(model, () => {
            this.props.parentState.setDisplayLoader(false);
            onSuccess();
            this.props.onClickUpdate();
        }, () => {
            this.props.parentState.setDisplayLoader(false);
            onFailure();
        });
    }

    render() {
        return (
            <div class="widget-form">
                <div className="input-parameters">
                    <NumberInput name="Id video" value={this.state.idVideo} onChange={this.handleIdVideoChange} />
                </div>
            </div>
        );
    }

    handleIdVideoChange(e)
    {
        if (!isNaN(e.target.value)) {
            this.setState({
                idVideo: e.target.value
            });
        }
    }
}

export default YoutubeStatisticsVideoForm;