const buildRoutes = async app => new Promise((resolve) => {
  app.use('/api/v1/', (req, res) => {
    res.status(200).send(req);
  });

  resolve();
});

export default buildRoutes;
