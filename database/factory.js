/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/Credential', (faker) => {
  return {
    access_token: faker.string({ length: 80 }),
    public_key: faker.string({ length: 80 }),
    sandbox: faker.bool(),
    client: faker.name(),
  };
});
