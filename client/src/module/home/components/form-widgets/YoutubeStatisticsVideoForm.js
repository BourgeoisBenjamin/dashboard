import React, {Component} from "react";
import queryString from "query-string";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import StatisticsVideoModel from "../../../../core/models/services/youtube/request/StatisticsVideoModel";
import YoutubeStatisticsVideoService from "../../../../core/services/services/youtube/YoutubeStatisticsVideoService";

class YoutubeStatisticsVideoForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeStatisticsVideoService();

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
            this.service.getParams(params.id, () => {
                console.log(this.service.getRequestModel().id_video);
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

        model.id_video = this.state.idVideo;

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

        model.id_video = this.state.idVideo;

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
        this.setState({
            idVideo: e.target.value
        });
    }
}

export default YoutubeStatisticsVideoForm;