import TopArtistsUserModelRequest from "../../../models/services/spotify/request/TopArtistsUserModel";
import TopArtistsUserModelResponse from "../../../models/services/spotify/response/TopArtistsUserModel";
import Service from "../Service";

export default class SpotifyTopArtistsUserService extends Service
{
    constructor()
    {
        super(
            'service/spotify/top-artists-user/',
            new TopArtistsUserModelRequest(),
            new TopArtistsUserModelResponse(),
            (res, responseModel) => {
                this.responseModel.data = [];
                Object.assign(responseModel.data, res.data);
            }
        );
    }
}