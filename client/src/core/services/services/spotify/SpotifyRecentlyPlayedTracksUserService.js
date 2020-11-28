import RecentlyPlayedTracksUserModelRequest from "../../../models/services/spotify/request/RecentlyPlayedTracksUserModel";
import RecentlyPlayedTracksUserModelResponse from "../../../models/services/spotify/response/RecentlyPlayedTracksUserModel";
import Service from "../Service";

export default class SpotifyRecentlyPlayedTracksUserService extends Service
{
    constructor()
    {
        super(
            'service/spotify/recently-played-tracks-user/',
            new RecentlyPlayedTracksUserModelRequest(),
            new RecentlyPlayedTracksUserModelResponse(),
            (res, responseModel) => {
                this.responseModel.data = [];
                Object.assign(responseModel.data, res.data);
            }
        );
    }
}