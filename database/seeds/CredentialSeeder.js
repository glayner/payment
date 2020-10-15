'use strict';

/*
|--------------------------------------------------------------------------
| CredentialSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Credential = use('App/Models/Credential');

class CredentialSeeder {
  async run() {
    await Credential.createMany([
      {
        access_token:
          'TEST-5953419540153269-112109-5caccc148a213432328a9b6e338dd511__LC_LD__-260210308',
        public_key: 'TEST-7c638a31-a975-4e64-982e-961517dddddd',
        sandbox: true,
        client: 'Victor Gois Vieira',
      },
      {
        access_token:
          'APP_USR-5953419540153269-112109-00a6f3664135d872b514bd4a74168208__LB_LC__-260210308',
        public_key: 'APP_USR-58c9a749-f75a-439f-964e-cf028a8862c8',
        sandbox: false,
        client: 'Victor Gois Vieira',
      },
    ]);
  }
}

module.exports = CredentialSeeder;
