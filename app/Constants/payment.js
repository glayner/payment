/* eslint-disable camelcase */
/* eslint-disable-next-line camelcase */

module.exports = ({
  token,
  client,
  payment_method_id,
  transaction_amount,
}) => ({
  installments: 1,
  statement_descriptor: `MERCADOPAGO ${client}`,
  description: 'Comprar de Título para sorteio',
  token,
  binary_mode: true,
  payment_method_id,
  transaction_amount,
});
