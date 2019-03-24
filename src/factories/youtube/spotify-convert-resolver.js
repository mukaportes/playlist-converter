import config from '../../config';
import YoutubeSpotifyConvertResolver from '../../resolvers/youtube/spotify-convert';
import YoutubeService from '../../services/youtube';
import SpotifyService from '../../services/spotify';
import YoutubePresenter from '../../presenters/youtube';

export default class YoutubeSpotifyConvertResolverFactory {
  create() {
    return new YoutubeSpotifyConvertResolver(
      {
        youtubePresenter: new YoutubePresenter(),
        youtubeService: new YoutubeService(config.default.youtube),
        spotifyService: new SpotifyService(config.default.spotify),
      },
    );
  }
}
