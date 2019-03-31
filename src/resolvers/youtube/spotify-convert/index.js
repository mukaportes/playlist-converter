import BaseResolver from '../../../base/resolver';
import schema from './validations';
import events from '../../../base/enum/events';
import messages from '../../../messages';

const { badRequest, success } = events;

export default class YoutubeSpotifyConvert extends BaseResolver {
  constructor({ youtubePresenter, youtubeService, spotifyService }) {
    super(schema);
    // NOTE: temp value, needs to create endpoints enum
    this.location = '[GET] /youtube';
    this.youtubePresenter = youtubePresenter;
    this.youtubeService = youtubeService;
    this.spotifyService = spotifyService;
  }

  // NOTE: temp solution before Regex-based trimming implementation
  getPlaylistIdFromUrl(playlistUrl) {
    const trimStart = playlistUrl.indexOf('list=') + 5;

    return playlistUrl.substr(trimStart, (playlistUrl.length - trimStart));
  }

  createPromisesList(playlist) {
    const formatPlaylist = this.youtubePresenter.formatPlaylistItems(playlist);

    return formatPlaylist.map(searchItem => new Promise(async (resolve) => {
      try {
        const getSearchResult = await this.spotifyService.getSearchResult(searchItem.title);

        resolve(getSearchResult);
      } catch (error) {
        // logger.debug(`Track "${searchItem.title}" not found: `, error);

        resolve({});
      }
    }));
  }

  async run(request) {
    if (!this.isSchemaValid(request)) {
      this.emit(badRequest, { ...messages.invalidInput, details: this.getValidationErrors() });

      return;
    }

    const playlistId = this.getPlaylistIdFromUrl(request.playlistUrl);
    const playlist = await this.youtubeService.getPlaylistItems(playlistId);

    // if (playlist.errors > 0) {
    //   this.emit(unprocessableEntity, { error: playlist.errors });

    //   return;
    // }

    const promisesList = this.createPromisesList(playlist);
    const getSearchResult = await Promise.all(promisesList);

    const formatResult = this.spotifyPresenter.formatPlaylistItems(getSearchResult);

    this.emit(success, { getSearchResult });
  }
}
