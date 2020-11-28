import Service from "../Service";
import CountryCaseModelRequest from "../../../models/services/covid/request/CountryCaseModel";
import CountryCaseModelResponse from "../../../models/services/covid/response/CountryCaseModel";

export default class CovidCountryCaseService extends Service
{
    constructor()
    {
        super(
            'http://localhost:8080/service/covid/country-case/',
            new CountryCaseModelRequest(),
            new CountryCaseModelResponse(),
            (res, responseModel) => {
                Object.assign(responseModel, res.data);
            }
        );
    }
}