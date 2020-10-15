'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Credential extends Model {
  getSandbox(data) {
    return typeof data === 'number' ? data === 1 : data;
  }
}

module.exports = Credential;
