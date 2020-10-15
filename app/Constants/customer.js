/* eslint-disable camelcase */
/* eslint-disable-next-line camelcase */
const axios = require('axios');

const searchZipCode = async (zipCode) =>
  new Promise(async (resolve) => {
    axios
      .get(`https://viacep.com.br/ws/${zipCode}/json/`)
      .then((code) => code.data)
      .then((data) => resolve(data))
      .catch(() => {
        axios
          .get(`https://api.postmon.com.br/v1/cep/${zipCode}`)
          .then((code) => code.data)
          .then((data) =>
            resolve({
              ...data,
              localidade: data.cidade,
              uf: data.estado,
              ibge: data.estado_info.code_ibge,
            })
          )
          .catch((err) => resolve(err.response.data));
      });
  });

module.exports = async ({
  first_name,
  last_name,
  email,
  identification,
  phone: { area_code, number },
  address: { zip_code, street_number },
}) => {
  const cep = await searchZipCode(zip_code);
  return {
    first_name,
    last_name,
    entity_type: 'individual',
    type: 'customer',
    email,
    phone: { area_code, number },
    address: {
      zip_code,
      street_name: cep.bairro,
      street_number,
    },
    identification: {
      type: 'CPF',
      number: identification,
    },
  };
};
