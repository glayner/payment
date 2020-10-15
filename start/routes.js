/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.resource('/api/credential', 'CredentialController')
  .apiOnly()
  .middleware(['baseAuth']);

Route.post('/api/payment/sandbox', 'SandboxController.store')
  .middleware(['baseAuth'])
  .validator('Sandbox');

Route.post('/api/payment', 'PaymentController.store')
  .middleware(['baseAuth'])
  .validator('Payment');

Route.post('/api/payment/test', 'PaymentController.test')
  .middleware(['baseAuth'])
  .validator('Payment');
