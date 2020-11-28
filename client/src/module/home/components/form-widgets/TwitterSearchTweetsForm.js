import React, {Component} from "react";
import queryString from "query-string";
import NumberInput from "../../../../shared/components/inputs/NumberInput";
import SearchInput from "../../../../shared/components/inputs/SearchInput";
import SearchTweetsModel from "../../../../core/models/services/twitter/request/SearchTweetsModel";
import TwitterSearchTweetsService from "../../../../core/services/services/twitter/TwitterSearchTweetsService";
import history from "../../../../history";
import MenuContext from "../../../../core/contexts/MenuContext";

class TwitterSearchTweetsForm extends Component
{
    static contextType = MenuContext;

    constructor(props) {
        super(props);

        this.service = new TwitterSearchTweetsService();

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
            this.service.getParams(params.id, () => {
                this.setState({
                    search: this.service.getRequestModel().search,
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
        let params = queryString.parse(window.location.search);
        let model = new SearchTweetsModel();

        model.number_tweets = parseInt(this.state.numberTweets);
        model.search = this.state.search;

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
        let model = new SearchTweetsModel();

        model.number_tweets = parseInt(this.state.numberTweets);
        model.search = this.state.search;

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