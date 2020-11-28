import Service from "../Service";
import SummaryCountryModelRequest from "../../../models/services/covid/request/SummaryCountryModel";
import SummaryCountryModelResponse from "../../../models/services/covid/response/SummaryCountryModel";

export default class CovidSummaryCountryService extends Service
{
    constructor()
    {
        super(
            'service/covid/summary-country/',
            new SummaryCountryModelRequest(),
            new SummaryCountryModelResponse(),
            (res, responseModel) => {
                Object.assign(responseModel, res.data);
            }
        );
    }
}