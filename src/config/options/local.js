export default {
  logger: {
    level: process.env.LOGGER_LEVEL,
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    url: process.env.SPOTIFY_URL,
    authUrl: process.env.AUTH_SPOTIFY_URL,
  },
  youtube: {
    apiKey: process.env.YOUTUBE_APIKEY,
    url: process.env.YOUTUBE_URL,
  },
};
