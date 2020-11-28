import Service from "../Service";
import SearchTweetsModelRequest from "../../../models/services/twitter/request/SearchTweetsModel";
import SearchTweetsModelResponse from "../../../models/services/twitter/response/SearchTweetsModel";

export default class TwitterSearchTweetsService extends Service
{
    constructor()
    {
        super(
            'http://localhost:8080/service/twitter/search-tweets/',
            new SearchTweetsModelRequest(),
            new SearchTweetsModelResponse(),
            (res, responseModel) => {
                responseModel.data = [];
                Object.assign(responseModel.data, res.data);
            }
        );
    }
}