import _ from 'lodash';
import logger from '../logger';
import eventInfo from '../dictionaries/events';
import messages from '../messages';

export default class HttpHandler {
  constructor({ ResolverFactory, request, response }) {
    this.ResolverFactory = ResolverFactory;
    this.request = request;
    this.response = response;
  }

  /**
   * @param {string} propName: Name of the request property to be camelized
   * Dict: 'headers', 'body' and ''
   */
  getRequestCamelizedProperty(propName) {
    const formattedHeaders = {};

    if (this.request[propName]) {
      Object.keys(this.request[propName]).forEach((header) => {
        const camelizedProperty = _.camelCase(header);

        formattedHeaders[camelizedProperty] = this.request[propName][header];
      });
    }

    return formattedHeaders;
  }

  formatRequest() {
    const formattedRequest = {
      ...this.getRequestCamelizedProperty('body'),
      ...this.getRequestCamelizedProperty('params'),
      ...this.getRequestCamelizedProperty('headers'),
      ...this.getRequestCamelizedProperty('query'),
    };

    this.request = formattedRequest;
  }

  async executeRouteResolver() {
    try {
      const resolver = new this.ResolverFactory().create();
      this.setupEventListeners(resolver);
      this.formatRequest();

      await resolver.run(this.request);
    } catch (error) {
      this.response.status(eventInfo.internalServerError.code).json({
        ...messages.internalError,
        details: error.message,
      });
    }
  }

  setupEventListeners(resolver) {
    Object.keys(eventInfo).forEach((event) => {
      resolver.on(event, (data) => {
        logger[eventInfo[event].level](`${resolver.location} ${event}`, data);

        this.response.status(eventInfo[event].code).json(data);
      });
    });
  }
}
