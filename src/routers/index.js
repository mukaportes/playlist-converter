import YoutubeRoutes from './youtube';

const buildRoutes = async app => new Promise((resolve) => {
  app.use('/api/v1/youtube', YoutubeRoutes());

  resolve();
});

export default buildRoutes;
