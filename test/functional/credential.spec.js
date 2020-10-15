'use strict'

const { test, trait } = use('Test/Suite')('Credential')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

/** @typedef {import('@adonisjs/framework/src/Env')} Env */
const Env = use('Env');
const chance = require('chance').Chance()
const { credential } = require('./../helpers/assert')

test('List Credential - INDEX', async ({ assert, client }) => {
  const response = await client
    .get('api/credential')
    .loginVia(Env.get('AUTH_USERNAME'), Env.get('AUTH_PASSWORD'), 'basic')
    .end();
    
  assert.strictEqual(response.status, 200, 'response status - OK')
  assert.isOk(response, 'response in Credential [INDEX] - OK');
  assert.isObject(response.body, 'response in Credential [INDEX] is type Object - OK');
  assert.isNumber(response.body.total, 'response key total type Number - OK');
  assert.isNumber(response.body.perPage, 'response key perPage type Number - OK');
  assert.strictEqual(response.body.perPage, 10, 'response perPage equal 10 - OK');
  assert.isNumber(response.body.page, 'response key page type Number - OK');
  assert.isNumber(response.body.lastPage, 'response key lastPage type Number - OK');
  assert.isArray(response.body.data, 'response in Credential [INDEX] is type ARRAY - OK');
  assert.isTrue(response.body.data.length > 0, 'response there is some given - OK');
  credential(assert, response.body.data[0])
})


test('Created Credential - STORE', async ({ assert, client }) => {
  const response = await client
    .post(`api/credential`)
    .loginVia(Env.get('AUTH_USERNAME'), Env.get('AUTH_PASSWORD'), 'basic')
    .send({ 
      access_token: chance.string({ length: 20 }),
      public_key: chance.string({ length: 20 }),
      sandbox: chance.bool(),
      client: chance.name()
    })
    .end();
  
  assert.strictEqual(response.status, 201, 'response status - OK')
  assert.isOk(response, 'response in Credential [CREATE] - OK');
  assert.isObject(response.body, 'response in Credential [CREATE] is type Object - OK');
  credential(assert, response.body)
})

test('Detail Credential - SHOW', async ({ assert, client }) => {
  const { id } = await Factory.model('App/Models/Credential').create()

  const response = await client
    .get(`api/credential/${id}`)
    .loginVia(Env.get('AUTH_USERNAME'), Env.get('AUTH_PASSWORD'), 'basic')
    .end();

  assert.strictEqual(response.status, 200, 'response status - OK')
  assert.isOk(response, 'response in Credential [SHOW] - OK');
  assert.isObject(response.body, 'response in Credential [SHOW] is type Object - OK');
  credential(assert, response.body);
})

test('Updated Credential - UPDATE', async ({ assert, client }) => {
  const factory = await Factory.model('App/Models/Credential').create()
  await factory.reload()

  const { id, ...newFactory } = factory.toJSON()

  const body = { 
    access_token: chance.string({ length: 20 }),
    public_key: chance.string({ length: 20 }),
    sandbox: chance.bool(),
    client: chance.name()
  }

  const response = await client
    .put(`api/credential/${id}`)
    .loginVia(Env.get('AUTH_USERNAME'), Env.get('AUTH_PASSWORD'), 'basic')
    .send(body)
    .end();

  assert.strictEqual(response.status, 200, 'response status - OK')
  assert.isOk(response, 'response in Credential [UPDATE] - OK');
  assert.isObject(response.body, 'response in Credential [UPDATE] is type Object - OK');
  assert.strictEqual(response.body.access_token === newFactory.access_token, false, 'response updated access_token - OK' )
  assert.strictEqual(response.body.public_key === newFactory.public_key, false, 'response updated public_key - OK' )
  assert.strictEqual(response.body.client === newFactory.client, false, 'response updated client - OK' )
  assert.strictEqual(response.body.id === id, true, 'response not updated id - OK')
  credential(assert, response.body);
})

test('Created Credential - DESTROY', async ({ assert, client }) => {
  const factory = await Factory.model('App/Models/Credential').create()
  await factory.reload()

  const response = await client
    .delete(`api/credential/${factory.id}`)
    .loginVia(Env.get('AUTH_USERNAME'), Env.get('AUTH_PASSWORD'), 'basic')
    .end();

  assert.strictEqual(response.status, 204, 'response status - OK')
})