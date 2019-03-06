import winston from 'winston';
import config from '../../config';

const { level } = config.default.logger;

const logger = winston.createLogger({
  level,
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
  ],
});

export default logger;
