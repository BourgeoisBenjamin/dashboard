import React, {Component} from "react";
import CountryInput from "../../../../shared/components/inputs/CountryInput";
import CovidService from "../../../../core/services/services/CovidService";
import SummaryCountryModel from "../../../../core/models/services/covid/request/SummaryCountryModel";
import queryString from "query-string";
import CountryCaseModel from "../../../../core/models/services/covid/request/CountryCaseModel";

class CovidSummaryCountryForm extends Component
{
    constructor(props) {
        super(props);

        this.service = new CovidService();

        this.state = {
            countryName: ''
        }
        this.props.parentState.setOnClickAddWidget((onSuccess, onFailure) => {
            this.onClickAddWidget(onSuccess, onFailure);
        })
        this.props.parentState.setOnClickUpdateWidget((onSuccess, onFailure) => {
            this.onClickUpdateWidget(onSuccess, onFailure);
        })
        this.handleCountryChange = this.handleCountryChange.bind(this);

        this.getWidgetData();
    }

    getWidgetData()
    {
        let params = queryString.parse(window.location.search);

        if (params.id) {
            this.service.getSummaryCountryParams(params.id, () => {
                this.setState({
                    countryName: this.service.getDataSummaryCountryRequest().country
                })
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

        this.service.putSummaryCountry(model, params.id, () => {
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
        let model = new SummaryCountryModel();

        model.country = this.state.countryName;

        this.props.parentState.setDisplayLoader(true);

        this.service.postSummaryCountry(model, () => {
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
                    <CountryInput name="Country" value={this.state.countryName} onChange={this.handleCountryChange}/>
                </div>
            </div>
        );
    }

    handleCountryChange(e)
    {
        this.setState({
            countryName: e.target.value
        });
    }
}

export default CovidSummaryCountryForm;
