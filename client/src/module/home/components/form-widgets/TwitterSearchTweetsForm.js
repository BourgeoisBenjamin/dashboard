import React, {Component} from "react";
import CountryInput from "../../../../shared/components/inputs/CountryInput";
import SummaryCountryModel from "../../../../core/models/services/covid/request/SummaryCountryModel";
import queryString from "query-string";
import LastTweetsModel from "../../../../core/models/services/twitter/request/LastTweetsModel";
import TwitterService from "../../../../core/services/services/TwitterService";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import SearchInput from "../../../../shared/components/inputs/SearchInput";
import SearchTweetsModel from "../../../../core/models/services/twitter/request/SearchTweetsModel";

class TwitterSearchTweetsForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new TwitterService();

        this.state = {
            search: '',
            numberTweets: ''
        }
        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })

        this.handleNumberTweetsChange = this.handleNumberTweetsChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);

        this.getWidgetData();
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.getSearchTweetsParams(params.id, () => {
                this.setState({
                    search: this.service.getSearchTweetRequest().search,
                    numberTweets: this.service.getSearchTweetRequest().number_tweets
                })
            }, () => {

            });
        }
    }

    onClickUpdateWidget(onSuccess, onFailure)
    {
        let params = queryString.parse(window.location.search);
        let model = new SearchTweetsModel();

        model.number_tweets = parseInt(this.state.numberTweets);
        model.search = this.state.search;

        this.props.parentState.setDisplayLoader(true);

        this.service.putSearchTweets(model, params.id, () => {
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
        let model = new SearchTweetsModel();

        model.number_tweets = parseInt(this.state.numberTweets);
        model.search = this.state.search;

        this.props.parentState.setDisplayLoader(true);

        this.service.postSearchTweets(model, () => {
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
                <div className="input-parameters">
                    <SearchInput name="Search" value={this.state.search} onChange={this.handleSearchChange} />
                </div>
            </div>
        );
    }

    handleSearchChange(e)
    {
        this.setState({
            search: e.target.value
        });
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

export default TwitterSearchTweetsForm;