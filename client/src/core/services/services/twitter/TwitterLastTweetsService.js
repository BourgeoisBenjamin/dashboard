import Service from "../Service";
import LastTweetsModelRequest from "../../../models/services/twitter/request/LastTweetsModel";
import LastTweetsModelResponse from "../../../models/services/twitter/response/LastTweetsModel";

export default class TwitterLastTweetsService extends Service
{
    constructor()
    {
        super(
            'service/twitter/last-tweets/',
            new LastTweetsModelRequest(),
            new LastTweetsModelResponse(),
            (res, responseModel) => {
                responseModel.data = [];
                Object.assign(responseModel.data, res.data);
            }
        );
    }
}