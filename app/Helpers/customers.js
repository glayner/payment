const axios = require('axios');

const customer = use('App/Constants/customer');

const newCustomers = async (payer, token) =>
  new Promise(async (resolve) => {
    const dataPayer = await customer(payer);
    axios
      .post(
        `https://api.mercadopago.com/v1/customers?access_token=${token}`,
        dataPayer
      )
      .then((result) => result.data)
      .then(async (data) => {
        if (data && data.id) {
          resolve({
            id: data.id,
          });
        } else {
          resolve(false);
        }
      })
      .catch((err) => resolve(err.response.data));
  });

module.exports = async (token, email, payer) =>
  new Promise(async (resolve) => {
    axios
      .get('https://api.mercadopago.com/v1/customers/search', {
        params: {
          access_token: token,
          email,
        },
      })
      .then((result) => result.data)
      .then(async (data) => {
        if (
          data &&
          data.paging &&
          data.paging.total &&
          data.paging.total === 1
        ) {
          resolve({ id: data.results[0].id });
        } else {
          resolve(await newCustomers(payer, token));
        }
      })
      .catch((err) => resolve(err.response.data));
  });
