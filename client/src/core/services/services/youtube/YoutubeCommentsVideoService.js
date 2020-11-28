import CommentsVideoModelRequest from "../../../models/services/youtube/request/CommentsVideoModel";
import CommentsVideoModelResponse from "../../../models/services/youtube/response/CommentsVideoModel";
import Service from "../Service";

export default class YoutubeCommentsVideoService extends Service
{
    constructor()
    {
        super(
            'http://localhost:8080/service/youtube/comments-video/',
            new CommentsVideoModelRequest(),
            new CommentsVideoModelResponse(),
            (res, responseModel) => {
                this.responseModel.data = [];
                Object.assign(responseModel.data, res.data);
            }
        );
    }
}