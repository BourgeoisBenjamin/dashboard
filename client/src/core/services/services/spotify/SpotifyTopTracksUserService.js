import TopTracksUserModelRequest from "../../../models/services/spotify/request/TopTracksUserModel";
import TopTracksUserModelResponse from "../../../models/services/spotify/response/TopTracksUserModel";
import Service from "../Service";

export default class SpotifyTopTracksUserService extends Service
{
    constructor()
    {
        super(
            'service/spotify/top-tracks-user/',
            new TopTracksUserModelRequest(),
            new TopTracksUserModelResponse(),
            (res, responseModel) => {
                this.responseModel.data = [];
                Object.assign(responseModel.data, res.data);
            }
        );
    }
}