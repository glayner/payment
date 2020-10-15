const axios = require('axios');

const cancelled = async (accessToken, id) =>
  new Promise(async (resolve) => {
    axios
      .put(
        `https://api.mercadopago.com/v1/payments/${id}?access_token=${accessToken}`,
        { status: 'cancelled' }
      )
      .then((mercado) => mercado.data)
      .then((result) => {
        if (result === 'cancelled') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => resolve(err.response.data));
  });

module.exports = (accessToken, payload) =>
  new Promise(async (resolve) => {
    axios
      .post(
        `https://api.mercadopago.com/v1/payments?access_token=${accessToken}`,
        payload
      )
      .then((mercado) => mercado.data)
      .then(async (result) => {
        if (result.status === 'in_process') {
          const cancel = await cancelled(accessToken, result.id);
          if (cancel) {
            resolve({
              information: 'Transação em processamento',
              action: 'Cancelamento do Pagamento',
              result: 'Pagamento cancelado com sucesso',
            });
          } else {
            resolve({
              information: 'Transação em processamento',
              action: 'Cancelamento do Pagamento',
              result: 'Erro durante o cancelamento da compra',
            });
          }
        } else {
          resolve(result);
        }
      })
      .catch((err) => resolve(err.response.data));
  });
