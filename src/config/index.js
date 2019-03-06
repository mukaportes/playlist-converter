const env = process.env.NODE_ENV || 'local';
const configFile = `./options/${env}.js`;

if (env === 'local') {
  /* eslint-disable */
  const dotenv = require('dotenv');

  dotenv.config();
}

const config = require(configFile);

export default config;
