'use strict';

const BaseExceptionHandler = use('BaseExceptionHandler');
/** @typedef {import('@adonisjs/framework/src/Env')} Env */
const Env = use('Env');
const Youch = require('youch');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.message);
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.resquest);
      const errorJSON = youch.toJSON();
      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report() {}
}

module.exports = ExceptionHandler;