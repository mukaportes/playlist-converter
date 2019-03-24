import express from 'express';
import httpHandler from '../../base/http/handler';
import YoutubeSpotifyResolverFactory from '../../factories/youtube/spotify-convert-resolver';

const youtubeRouter = express.Router();

const router = () => {
  youtubeRouter.route('/').get(async (req, res) => httpHandler(req, res, YoutubeSpotifyResolverFactory));

  return youtubeRouter;
};

export default router;
