import React, {Component} from "react";
import queryString from "query-string";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import YoutubeCommentsVideoService from "../../../../core/services/services/youtube/YoutubeCommentsVideoService";
import CommentsVideoModel from "../../../../core/models/services/youtube/request/CommentsVideoModel";
import history from "../../../../history";

class YoutubeCommentsVideoForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new YoutubeCommentsVideoService();

        this.state = {
            idVideo: '',
            numberComments: ''
        }

        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleIdVideoChange = this.handleIdVideoChange.bind(this);
        this.handleNumberCommentsChange = this.handleNumberCommentsChange.bind(this);

        this.getWidgetData();
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.getParams(params.id, () => {
                this.setState({
                    idVideo: this.service.getRequestModel().id_video,
                    numberComments: this.service.getRequestModel().number_comments
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
        let model = new CommentsVideoModel();

        model.number_comments = parseInt(this.state.numberComments);
        model.id_video = this.state.idVideo;

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
        let model = new CommentsVideoModel();

        model.number_comments = parseInt(this.state.numberComments);
        model.id_video = this.state.idVideo;

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
                    <NumberInput name="Id video" value={this.state.idVideo} onChange={this.handleIdVideoChange} />
                </div>
                <div className="input-parameters">
                    <NumberInput name="Number comments" value={this.state.numberComments} onChange={this.handleNumberCommentsChange} />
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

    handleNumberCommentsChange(e)
    {
        if (!isNaN(e.target.value)) {
            this.setState({
                numberComments: e.target.value
            });
        }
    }
}

export default YoutubeCommentsVideoForm;

