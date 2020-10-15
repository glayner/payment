'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
const { validate } = require('gerador-validador-cpf');

class ValidationDocumentProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register(data, field, message, args, get) {
    if (data) {
      const validation = validate(get(data, field));
      if (!validation) {
        throw new Error('Invalidate Document');
      }
    }
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = use('Validator');
    Validator.extend('validateDocument', this.register, 'Invalidate Document');
  }
}

module.exports = ValidationDocumentProvider;
