'use strict'

const { test, trait } = use('Test/Suite')('Payment')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const generate = require('gerador-validador-cpf')


trait('Test/ApiClient')
trait('Auth/Client')

/** @typedef {import('@adonisjs/framework/src/Env')} Env */
const Env = use('Env');
const chance = require('chance').Chance()

test('Created Payment [SANDBOX] - STORE', async ({ assert, client }) => {
   const phone = chance.phone({ country: 'br', formatted: false });

   const response = await client
      .post('api/payment/sandbox')
      .loginVia(Env.get('AUTH_USERNAME'), Env.get('AUTH_PASSWORD'), 'basic')
      .send({
         token: "4a862c0496246bf501ff6372f76f9060",
         payment_method_id: 'master',
         transaction_amount: chance.integer({ min: 2, max: 1000 }),
         payer: {
            email: chance.email(),
            first_name: chance.first(),
            last_name: chance.last(),
            phone: {
               area_code: phone.substr(0, 2),
               number: phone.substr(2, phone.length)
            },
            identification: chance.cpf().replace('.', '').replace('.', '').replace('-', ''),
            address: {
               zip_code: chance.string({ length: 8, numeric: true }),
               street_number: chance.integer({ min: 1, max: 100000 })
            }
         }
      })
   .end();

   console.log(response.body, 'TESTE')
}).timeout(10000);
