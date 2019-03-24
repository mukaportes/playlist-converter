import { EventEmitter } from 'events';
import Joi from 'joi';

export default class BaseResolver extends EventEmitter {
  constructor(schema) {
    super();
    this.schema = schema;
  }

  validateSchema() {
    return Joi.validate(this.input, this.schema, { abortEarly: false });
  }

  isSchemaValid(input) {
    this.input = input;

    return this.validateSchema().error === null;
  }

  getValidationErrors() {
    return this.validateSchema().error.details;
  }
}
