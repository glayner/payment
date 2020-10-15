'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Credencials = use('App/Models/Credential');
const Customers = use('App/Helpers/customers');
const Payment = use('App/Helpers/payment');
const payloadPayment = use('App/Constants/payment');
const Refunded = use('App/Helpers/refunded');
/**
 * Resourceful controller for interacting with payments
 */
class PaymentController {
  /**
   * Create/save a new payment.
   * POST payments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    return new Promise(async (resolve) => {
      try {
        const { credential, payer, ...value } = request.only([
          'credential',
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
        const { access_token, client } = await Credencials.findOrFail(
          credential
        );
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

  /**
   * Create/save a new payment.
   * POST test payments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async test({ request, response }) {
    return new Promise(async (resolve) => {
      try {
        const { credential, payer, ...value } = request.only([
          'credential',
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
        const { access_token, client } = await Credencials.findOrFail(
          credential
        );
        const customersData = await Customers(access_token, payer.email, payer);

        const payment = await Payment(access_token, {
          ...payloadPayment({ ...value, client }),
          payer: customersData,
        });

        if (payment.status === 'approved') {
          const refunded = await Refunded(access_token, payment.id);

          if (refunded && refunded.status) {
            resolve(response.status(201).send(refunded));
          } else {
            resolve(response.status(401).send(refunded));
          }
        }
      } catch ({ response: { data: error } }) {
        resolve(response.status(error.status).send(error));
      }
    });
  }
}

module.exports = PaymentController;
