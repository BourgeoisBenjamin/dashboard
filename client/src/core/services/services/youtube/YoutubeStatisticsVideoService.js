import StatisticsVideoModelRequest from "../../../models/services/youtube/request/StatisticsVideoModel";
import StatisticsVideoModelResponse from "../../../models/services/youtube/response/StatisticsVideoModel";
import Service from "../Service";

export default class YoutubeStatisticsVideoService extends Service
{
    constructor()
    {
        super(
            'http://localhost:8080/service/youtube/statistics-video/',
            new StatisticsVideoModelRequest(),
            new StatisticsVideoModelResponse(),
            (res, responseModel) => {
                this.responseModel.data = [];
                Object.assign(responseModel, res.data);
            }
        );
    }
}