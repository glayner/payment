'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Credencials = use('App/Models/Credential');
const Customers = use('App/Helpers/customers');
const Payment = use('App/Helpers/payment');
const payloadPayment = use('App/Constants/payment');
/**
 * Resourceful controller for interacting with sandboxes
 */
class SandboxController {
  /**
   * Create/save a new sandbox.
   * POST sandboxes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    return new Promise(async (resolve) => {
      try {
        const { payer, ...value } = request.only([
          'token',
          'payment_method_id',
          'transaction_amount',
          'payer',
          'quantity',
          'unit_price',
        ]);

        /**
         * Created customers
         */
        // eslint-disable-next-line camelcase
        const { access_token, client } = await Credencials.findOrFail(1);
        const customersData = await Customers(access_token, payer.email, payer);

        const payment = await Payment(access_token, {
          ...payloadPayment({ ...value, client }),
          payer: customersData,
        });
        resolve(
          response
            .status(typeof payment.status === 'string' ? 201 : payment.status)
            .send(payment)
        );
      } catch ({ response: { data: error } }) {
        resolve(response.status(error.status).send(error));
      }
    });
  }
}

module.exports = SandboxController;
