var lodash = require('lodash');
var fs = require('fs');
var validator = require('../lib/validator')
//@TODO move auth creds to database rather than file

var accountController = {}

accountController.getOverview  = (params, callback) => {

  if (!validator.params(params, ['id'])) {
    var response = {
      type: 'ERROR',
      code: 'ACCOUNT_OVERVIEW_001',
      message: 'Invalid Params',
    }
    callback(false, response)
    return
  }//no token

  if (params.id != 1) {
    var response = {
      type: 'ERROR',
      code: 'ACC_002',
      message: 'User Not Found',
      data: req.body,
    }
    callback(false, response)
    return
  }

  var auth = fs.readFileSync("./config/auth.json");
  var authJson = JSON.parse(auth);

  data = {
    name: authJson.name
  }

  var response = {
    type: 'SUCCESS',
    code: 'ACC_003',
    message: 'Successful Request',
    data: data,
  }
  callback(false, response)
  return
}

module.exports = accountController
