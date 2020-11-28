import StatisticsChannelModelRequest from "../../../models/services/youtube/request/StatisticsChannelModel";
import StatisticsChannelModelResponse from "../../../models/services/youtube/response/StatisticsChannelModel";
import Service from "../Service";

export default class YoutubeStatisticsChannelService extends Service
{
    constructor()
    {
        super(
            'service/youtube/statistics-channel/',
            new StatisticsChannelModelRequest(),
            new StatisticsChannelModelResponse(),
            (res, responseModel) => {
                Object.assign(responseModel, res.data);
            }
        );
    }
}