'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Credencials = use('App/Models/Credential');

/**
 * Resourceful controller for interacting with credentials
 */
class CredentialController {
  /**
   * Show a list of all credentials.
   * GET credentials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, response }) {
    const { page } = params;
    const credencials = await Credencials.query().paginate(page, 10);
    return response.status(200).json(credencials);
  }

  /**
   * Create/save a new credential.
   * POST credentials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const body = request.only([
      'access_token',
      'public_key',
      'sandbox',
      'client',
    ]);
    const credencials = await Credencials.create(body);
    return response.status(201).json(credencials);
  }

  /**
   * Display a single credential.
   * GET credentials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ response, params }) {
    const { id } = params;
    const credencials = await Credencials.findOrFail(id);
    return response.status(200).json(credencials);
  }

  /**
   * Update credential details.
   * PUT or PATCH credentials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params;
    const body = request.only([
      'access_token',
      'public_key',
      'sandbox',
      'client',
    ]);
    const credencials = await Credencials.findOrFail(id);
    credencials.merge(body);
    await credencials.save();
    await credencials.reload();
    return response.status(200).json(credencials);
  }

  /**
   * Delete a credential with id.
   * DELETE credentials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params;
    const credencials = await Credencials.findOrFail(id);
    await credencials.delete();
    return response.status(204).json(credencials);
  }
}

module.exports = CredentialController;
