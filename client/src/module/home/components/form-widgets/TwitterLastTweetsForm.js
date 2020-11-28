import React, {Component} from "react";
import queryString from "query-string";
import LastTweetsModel from "../../../../core/models/services/twitter/request/LastTweetsModel";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import TwitterLastTweetsService from "../../../../core/services/services/twitter/TwitterLastTweetsService";
import history from "../../../../history";

class TwitterLastTweetsForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new TwitterLastTweetsService();

        this.state = {
            numberTweets: ''
        }
        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })
        this.handleNumberTweetsChange = this.handleNumberTweetsChange.bind(this);

        this.getWidgetData();
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.getParams(params.id, () => {
                this.setState({
                    numberTweets: this.service.getRequestModel().number_tweets
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
        let model = new LastTweetsModel();
        let params = queryString.parse(window.location.search);

        model.number_tweets = this.state.numberTweets;

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
        let model = new LastTweetsModel();

        model.number_tweets = parseInt(this.state.numberTweets);

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
                    <NumberInput name="Number tweets" value={this.state.numberTweets} onChange={this.handleNumberTweetsChange} />
                </div>
            </div>
        );
    }

    handleNumberTweetsChange(e)
    {
        if (!isNaN(e.target.value)) {
            this.setState({
                numberTweets: e.target.value
            });
        }
    }
}

export default TwitterLastTweetsForm;