var lodash = require('lodash');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var validator = require('../lib/validator')
const config = require('config');
var request = require('request');

var bittrexController = {}

bittrexController.test  = (params, callback) => {
  console.log('bittrexController.test')
  if (!validator.params(params, ['id'])) {
    var response = {
      type: 'ERROR',
      code: 'BITTREX_TEST_001',
      message: 'Invalid Params',
    }
    callback(false, response)
    return
  }

  var response = {
    type: 'SUCCESS',
    code: 'BITTREX_TEST_002',
    message: 'Successfully communicated with bittrex',
    data: {},
  }
  callback(true, response)
  return
}

module.exports = bittrexController
