import config from '../../config';
import YoutubeSpotifyConvertResolver from '../../resolvers/youtube/spotify-convert';
import YoutubeService from '../../services/youtube';
import SpotifyService from '../../services/spotify';

export default class YoutubeSpotifyConvertResolverFactory {
  create() {
    return new YoutubeSpotifyConvertResolver(
      new YoutubeService(config.default.youtube),
      new SpotifyService(config.default.spotify),
    );
  }
}
