import axios from 'axios';
import _ from 'lodash';

export default class AuthProvider {
  /**
   * @param {string} clientId: Client ID to generate a new access token
   * @param {string} clientSecret: Client Secret to generate a new access token
   * @param {string} authUrl: URL to generate a new access token
   */
  constructor({ clientId, clientSecret, authUrl }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.authUrl = authUrl;
  }

  getEncodedBase64() {
    const encodingTarget = `${this.clientId}:${this.clientSecret}`;
    const newBuffer = Buffer.from(encodingTarget);

    return newBuffer.toString('base64');
  }

  buildParams() {
    return {
      body: 'grant_type=client_credentials',
      options: {
        headers: {
          Authorization: `Basic ${this.getEncodedBase64()}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      url: `${this.authUrl}/token`,
    };
  }

  /**
   * @private
   */
  async authenticate() {
    const { body, options, url } = this.buildParams();
    const generateToken = await axios.post(url, body, options);

    const { accessToken, expiresIn } = this.formatAccessTokenResponse(generateToken);

    const now = new Date().getTime();
    const nowInMiliseconds = now * 1000;

    this.accessToken = accessToken;
    this.expiresIn = _.sumIntegerList([nowInMiliseconds, expiresIn]);
  }

  /**
   * @public
   */
  async getAccessToken() {
    if (!this.accessToken || !this.isTokenExpired()) return this.authenticate();

    return this.accessToken;
  }

  /**
   * @private
   * @param response: Http response from the API to be formatted
   */
  formatAccessTokenResponse(response) {
    const camelCaseResponse = {};

    Object.keys(response.data).forEach((item) => {
      const camelCaseKey = _.camelCase(item);

      camelCaseResponse[camelCaseKey] = response.data[item];
    });

    return camelCaseResponse;
  }

  /**
   * @private
   */
  isTokenExpired() {
    return _.isIntegerBiggerThan(this.getNowInMiliseconds(), this.expiresIn);
  }

  /**
   * @private
   */
  getNowInMiliseconds() {
    const now = new Date().getTime();

    return now * 1000;
  }
}
