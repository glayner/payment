'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CredentialSchema extends Schema {
  up() {
    this.create('credentials', (table) => {
      table.increments();
      table.string('access_token', 100).notNullable().unique();
      table.string('public_key', 100).notNullable().unique();
      table.boolean('sandbox', false).notNullable();
      table.string('client', 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('credentials');
  }
}

module.exports = CredentialSchema;
