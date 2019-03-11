import axios from 'axios';
import AuthProvider from '../auth-provider';

export default class SpotifyService extends AuthProvider {
  /**
   * @param {string} clientId: Client ID to generate a new access token
   * @param {string} clientSecret: Client Secret to generate a new access token
   * @param {string} url: Base URL of the API
   * @param {string} authUrl: URL to generate a new access token
   */
  constructor({
    clientId, clientSecret, url, authUrl,
  }) {
    super({ clientId, clientSecret, authUrl });
    this.url = url;
  }


  /**
   * @private
   * @param {string} accessToken: Access token to authorize the app to use Spotify API
   */
  buildPlaylistItemsParams(accessToken) {
    return {
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      url: `${this.url}/playlists/${this.playlistId}`,
    };
  }

  /**
   * @public
   * @param {string} playlistId: ID of the playlist to be searched for
   */
  async getPlaylistItems(playlistId) {
    this.playlistId = playlistId;

    const accessToken = await this.getAccessToken();
    const { options, url } = this.buildPlaylistItemsParams(accessToken);

    return axios.get(url, options);
  }
}
