import ChannelVideosModelRequest from "../../../models/services/youtube/request/ChannelVideosModel";
import ChannelVideosModelResponse from "../../../models/services/youtube/response/ChannelVideosModel";
import Service from "../Service";

export default class YoutubeChannelVideoService extends Service
{
    constructor()
    {
        super(
            'http://localhost:8080/service/youtube/channel-videos/',
            new ChannelVideosModelRequest(),
            new ChannelVideosModelResponse(),
            (res, responseModel) => {
                this.responseModel.data = [];
                Object.assign(responseModel.data, res.data);
            }
        );
    }
}