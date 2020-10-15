'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @typedef {import('@adonisjs/framework/src/Env')} Env */
const Env = use('Env');

class UserSeeder {
  async run() {
    await User.create({
      name: 'Administrator',
      username: Env.get('AUTH_USERNAME'),
      password: Env.get('AUTH_PASSWORD'),
      active: true,
    });
  }
}

module.exports = UserSeeder;
