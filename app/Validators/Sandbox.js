'use strict';

class Sandbox {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required|string|min:32|max:32',
      payment_method_id: 'required|in:master,visa,hipercard,amex,elo',
      transaction_amount: 'required|number|range:2,1000',
      payer: 'required|object',
      'payer.email': 'required|email',
      'payer.first_name': 'required|string',
      'payer.last_name': 'required|string',
      'payer.phone.area_code': 'required|string|min:2|max:3',
      'payer.phone.number': 'required|string|min:8|max:9',
      'payer.identification': 'required|string|min:11|max:11|validateDocument',
      'payer.address.zip_code': 'required|string|min:8|max:9',
      'payer.address.street_number': 'required|number|range:1,100000',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).json(errorMessages);
  }
}

module.exports = Sandbox;
