const axios = require('axios');

module.exports = async (accessToken, id) =>
  new Promise(async (resolve) => {
    axios
      .put(
        `https://api.mercadopago.com/v1/payments/${id}?access_token=${accessToken}`,
        { status: 'refunded' }
      )
      .then((mercado) => mercado.data)
      .then((result) => {
        if (result === 'refunded') {
          resolve({
            status: true,
            message: 'Testes Realizado com sucesso. O Valor foi estornado.',
            result,
          });
        } else {
          resolve({
            status: false,
            message: 'Erro durante o estorno do valor.',
            result,
          });
        }
      })
      .catch((err) => resolve(err.response.data));
  });
