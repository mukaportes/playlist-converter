import app from './app';
import logger from './helpers/logger';

app.start().then(() => {
  app.listen(app.port);
  logger.info(`App running on PORT ${app.port}`);
}).catch((error) => {
  logger.error('App execution failed. Details: ', error);
});

export default app;
