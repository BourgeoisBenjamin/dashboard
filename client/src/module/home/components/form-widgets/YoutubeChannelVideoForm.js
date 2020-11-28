import React, {Component} from "react";
import queryString from "query-string";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import YoutubeChannelVideoService from "../../../../core/services/services/youtube/YoutubeChannelVideoService";
import ChannelVideosModel from "../../../../core/models/services/youtube/request/ChannelVideosModel";
import history from "../../../../history";
import MenuContext from "../../../../core/contexts/MenuContext";

class YoutubeChannelVideoForm extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new YoutubeChannelVideoService();

        this.state = {
            idChannel: '',
            numberVideos: ''
        }

        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleIdChannelChange = this.handleIdChannelChange.bind(this);
        this.handleNumberVideosChange = this.handleNumberVideosChange.bind(this);

        this.getWidgetData();
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.getParams(params.id, () => {
                this.setState({
                    idChannel: this.service.getRequestModel().id_channel,
                    numberVideos: this.service.getRequestModel().number_videos
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
        let model = new ChannelVideosModel();

        model.number_videos = parseInt(this.state.numberVideos);
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
        let model = new ChannelVideosModel();

        model.number_videos = parseInt(this.state.numberVideos);
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
                <div className="input-parameters">
                    <NumberInput name="Number videos" value={this.state.numberVideos} onChange={this.handleNumberVideosChange} />
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

    handleNumberVideosChange(e)
    {
        if (!isNaN(e.target.value)) {
            this.setState({
                numberVideos: e.target.value
            });
        }
    }
}

export default YoutubeChannelVideoForm;
