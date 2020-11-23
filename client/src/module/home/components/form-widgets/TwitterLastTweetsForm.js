import React, {Component} from "react";
import CountryInput from "../../../../shared/components/inputs/CountryInput";
import SummaryCountryModel from "../../../../core/models/services/covid/request/SummaryCountryModel";
import queryString from "query-string";
import LastTweetsModel from "../../../../core/models/services/twitter/request/LastTweetsModel";
import TwitterService from "../../../../core/services/services/TwitterService";
import NumberInput from "../../../../shared/components/inputs/NumberInput";

class TwitterLastTweetsForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new TwitterService();

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
            this.service.getLastTweetsParams(params.id, () => {
                console.log(this.service.getLastTweetModelResponse());
                // this.setState({
                //     countryName: this.service.getLastTweetModelResponse().country
                // })
            }, () => {

            });
        }
    }

    onClickUpdateWidget(onSuccess, onFailure)
    {
        let model = new SummaryCountryModel();
        let params = queryString.parse(window.location.search);

        model.country = this.state.countryName;

        this.props.parentState.setDisplayLoader(true);

        this.service.putLastTweets(model, params.id, () => {
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
        let model = new LastTweetsModel();

        model.number_tweets = parseInt(this.state.numberTweets);

        this.props.parentState.setDisplayLoader(true);

        this.service.postLastTweets(model, () => {
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