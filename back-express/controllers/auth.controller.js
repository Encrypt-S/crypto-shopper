var lodash = require('lodash');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var validator = require('../lib/validator')
//@TODO move auth creds to database rather than file

var authController = {}

authController.validateToken  = (params, callback) => {

  if (!validator.params(params, ['token'])) {
    var response = {
      type: 'ERROR',
      code: 'AUTH_TOKEN_001',
      message: 'Invalid Params',
    }
    callback(false, response)
    return
  }//no token

  var auth = fs.readFileSync("./config/auth.json");
  var authJson = JSON.parse(auth);

  jwt.verify(params.token, authJson.secret, function(err, decoded) {
    if (err) {
      var response = {
        type: 'ERROR',
        code: 'AUTH_TOKEN_002',
        message: 'Invalid Token',
      }
      callback(false, response)
      return
    }//invalid token
    callback(true) //valid token
    return
  });
}

authController.login  = (params, callback) => {

  if (!validator.params(params, ['email', 'password'])) {
    var response = {
      type: 'ERROR',
      code: 'AUTH_LOGIN_001',
      message: 'Invalid Params',
    }
    callback(false, response)
    return
  }

  //check username and password
  var auth = fs.readFileSync("./config/auth.json");
  var authJson = JSON.parse(auth);

  if (authJson.username != params.email || authJson.password != params.password) {
    var response = {
      type: 'ERROR',
      code: 'AUTH_LOGIN_002',
      message: 'Invalid Username or Password',
    }
    callback(false, response)
    return
  }

  var data = {
      email: params.email,
      id: 1,
  }

  var token = jwt.sign(data, authJson.secret, {
    expiresIn: 60*60*24,
  });

  var response = {
    type: 'SUCCESS',
    code: 'AUTH_LOGIN_003',
    message: 'Successful Login',
    token: token,
  }

  callback(true, response)
  return

}

authController.register  = (params, callback) => {

  if (!validator.params(params, ['email', 'password'])) {
    var response = {
      type: 'ERROR',
      code: 'AUTH_REGISTER_001',
      message: 'Invalid Params',
    }
    callback(false, response)
    return
  }

  //check username and password
  var auth = fs.readFileSync("./config/auth.json");
  var authJson = JSON.parse(auth);

  if (authJson.username != params.email || authJson.password != params.password) {
    var response = {
      type: 'ERROR',
      code: 'AUTH_REGISTER_002',
      message: 'Invalid Username or Password',
    }
    callback(false, response)
    return
  }

  var data = {
      email: params.email,
      id: 1,
  }

  var token = jwt.sign(data, authJson.secret, {
    expiresIn: 60*60*24,
  });

  var response = {
    type: 'SUCCESS',
    code: 'AUTH_LOGIN_003',
    message: 'Successful Login',
    token: token,
  }

  callback(true, response)
  return

}

module.exports = authController
