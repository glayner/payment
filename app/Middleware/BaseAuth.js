/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const auth = use('basic-auth');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
const Hash = use('Hash');

class BaseAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   * @param {Function} next
   */
  /* eslint-disable */
  async handle ({ request, response }, next) {
    const credentials = auth(request.request)

    const user = await User.findBy('username', credentials.name)

    if(!user) {
      return response.status(404).send({
        message: 'Invalid Credentials'
      })
    }

    const result = await Hash.verify(credentials.pass, user.password)

    if(!result) {
      return response.status(404).send({
        message: 'Invalid Credentials'
      })
    }

    await next();
  }
  /* eslint-enable */
}

module.exports = BaseAuth;
