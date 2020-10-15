function credential (assert, data) {
    assert.isNumber(data.id, 'response key ID type Number - OK');
    assert.isString(data.access_token, 'response key access_token type String - OK');
    assert.isString(data.public_key, 'response key public_key type String - OK');
    assert.isString(data.client, 'response key client type String - OK');
    assert.isBoolean(data.sandbox, 'response key sandbox type Number - OK');
}

module.exports = { credential }
