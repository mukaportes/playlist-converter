import axios from 'axios';
import logger from '../../base/logger';

export default class YouTube {
  /**
   * @param {string} apiKey: YouTube API Key
   * @param {string} url: YouTube API URL
   */
  constructor({ apiKey, url }) {
    this.apiKey = apiKey;
    this.url = url;
  }

  /**
   * @param {string} playlistId: ID of the target YouTube playlist
   * @returns {object}           Object containing all required request params for GetPlaylistItems
   */
  buildPlaylistItemsParams(playlistId) {
    return {
      params: {
        key: this.apiKey,
        part: 'snippet',
        playlistId,
      },
      url: `${this.url}/playlistItems`,
    };
  }

  /**
   * @param {string} playlistId: ID of the target YouTube playlist
   * @returns {array}            Array containing items from the playlist
   */
  async getPlaylistItems(playlistId) {
    const { params, url } = this.buildPlaylistItemsParams(playlistId);

    try {
      const requestResult = await axios.get(url, { params });
      const { items } = requestResult.data;

      return items;
    } catch (error) {
      logger.error('GetPlaylistItems execution failed. ', error);

      return [];
    }
  }
}
