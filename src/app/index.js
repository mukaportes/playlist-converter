import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import buildRoutes from '../routers';
import loadLodashMixins from '../helpers';

const port = process.env.PORT || 3000;
const app = express();

app.start = () => new Promise(async (resolve) => {
  app.use(bodyParser.json());
  app.use(cors());

  loadLodashMixins();

  buildRoutes(app);
  resolve();
});

app.port = port;

export default app;
