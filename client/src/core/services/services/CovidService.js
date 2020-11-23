import CountryCaseModelRequest from "../../models/services/covid/request/CountryCaseModel";
import SummaryCountryModelRequest from "../../models/services/covid/request/SummaryCountryModel";
import axios from "axios";
import CountryCaseModelResponse from "../../models/services/covid/response/CountryCaseModel";
import SummaryCountryModelResponse from "../../models/services/covid/response/SummaryCountryModel";

class CovidService
{
    header = {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('JWTToken')}`
        }
    }

    urlCountryCase = 'http://localhost:8080/service/covid/country-case/'
    urlSummaryCountry = 'http://localhost:8080/service/covid/summary-country/'

    constructor()
    {
        this.countryCaseModelRequest = new CountryCaseModelRequest();
        this.summaryCountryModelRequest = new SummaryCountryModelRequest();
        this.countryCaseModelResponse = new CountryCaseModelResponse();
        this.summaryCountryModelResponse = new SummaryCountryModelResponse();
    }

    getCountryCase(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlCountryCase + idWidget, this.header)
            .then(res => {
                Object.assign(this.countryCaseModelResponse, res.data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    getCountryCaseParams(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlCountryCase + idWidget + '/params', this.header)
            .then(res => {
                Object.assign(this.countryCaseModelRequest, res.data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    postCountryCase(data, onSuccess, onFailure)
    {
        axios.post(this.urlCountryCase, data, this.header)
            .then(res => {
                Object.assign(this.countryCaseModelRequest, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    putCountryCase(data, idWidget, onSuccess, onFailure)
    {
        axios.put(this.urlCountryCase + idWidget, data, this.header)
            .then(res => {
                Object.assign(this.countryCaseModelRequest, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    deleteCountryCase(idWidget, onSuccess, onFailure)
    {
        axios.put(this.urlCountryCase + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    getSummaryCountry(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlSummaryCountry + idWidget, this.header)
            .then(res => {
                Object.assign(this.summaryCountryModelResponse, res.data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    getSummaryCountryParams(idWidget, onSuccess, onFailure)
    {
        axios.get(this.urlSummaryCountry + idWidget + '/params', this.header)
            .then(res => {
                Object.assign(this.summaryCountryModelRequest, res.data);
                onSuccess();
            }).catch(error => {
            onFailure();
        })
    }

    postSummaryCountry(data, onSuccess, onFailure)
    {
        axios.post(this.urlSummaryCountry, data, this.header)
            .then(res => {
                Object.assign(this.summaryCountryModelRequest, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    putSummaryCountry(data, idWidget, onSuccess, onFailure)
    {
        axios.put(this.urlSummaryCountry + idWidget, data, this.header)
            .then(res => {
                Object.assign(this.summaryCountryModelRequest, data);
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    deleteSummaryCountry(idWidget, onSuccess, onFailure)
    {
        axios.put(this.urlSummaryCountry + idWidget, this.header)
            .then(res => {
                onSuccess();
            }).catch(error => {
                onFailure();
        })
    }

    getDataCountryCaseRequest()
    {
        return this.countryCaseModelRequest;
    }

    getDataSummaryCountryRequest()
    {
        return this.summaryCountryModelRequest;
    }

    getDataCountryCaseResponse()
    {
        return this.countryCaseModelResponse;
    }

    getDataSummaryCountryResponse()
    {
        return this.summaryCountryModelResponse;
    }
}

export default CovidService;