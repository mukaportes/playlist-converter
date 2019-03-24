import BaseResolver from '../../../base/resolver';
import schema from './validations';
import events from '../../../base/enum/events';
import messages from '../../../messages';

const { badRequest, success, unprocessableEntity } = events;

export default class YoutubeSpotifyConvert extends BaseResolver {
  constructor(youtubeService, spotifyService) {
    super(schema);
    // NOTE: temp value, needs to create endpoints enum
    this.location = '[GET] /youtube';
    this.youtubeService = youtubeService;
    this.spotifyService = spotifyService;
  }

  // NOTE: temp solution before Regex-based trimming implementation
  getPlaylistIdFromUrl(playlistUrl) {
    const trimStart = playlistUrl.indexOf('&list=') + 6;

    return playlistUrl.substr(trimStart, (playlistUrl.length - trimStart));
  }

  async run(request) {
    if (!this.isSchemaValid(request)) {
      this.emit(badRequest, { ...messages.invalidInput, details: this.getValidationErrors() });

      return;
    }

    const playlistId = this.getPlaylistIdFromUrl(request.playlistUrl);
    const playlist = await this.youtubeService.getPlaylistItems(playlistId);

    if (playlist.errors > 0) {
      this.emit(unprocessableEntity, { error: playlist.errors });

      return;
    }

    this.emit(success, { playlist });
  }
}
