var express = require('express');
var router = express.Router();
var lodash = require('lodash');
var config = require('config');
var jwt = require('jsonwebtoken');
var fs = require('fs');

//@TODO move auth creds to database rather than file

router.use(function(req, res, next) {

  //skip token middleware on auth attempt
  if(req.originalUrl == '/api/auth'){
    next();
    return
  }

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    var auth = fs.readFileSync("./config/auth.json");
    var authJson = JSON.parse(auth);
    // verifies secret and checks exp
    jwt.verify(token, authJson.secret, function(err, decoded) {
      if (err) {
        var response = {
          type: 'ERROR',
          code: 'JWT_001',
          message: 'Invalid Token',
          data: req.body,
        }
        res.send(JSON.stringify(response));
        return
      } else {
        // if everything is good, save to request for use in other routes
        console.log('TOKEN AUTHENTICATED');
        next();
        return
      }
    });

  } else {

    var response = {
      type: 'ERROR',
      code: 'JWT_002',
      message: 'No Token Provided',
      data: req.body,
    }
    res.send(JSON.stringify(response));
    return

  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Available endpoints [auth, rpc]');
});

router.post('/auth', function(req, res, next) {

  //check username and password
  var auth = fs.readFileSync("./config/auth.json");
  var authJson = JSON.parse(auth);

  if (!req.body || !req.body.username || !req.body.password){
    var response = {
      type: 'ERROR',
      code: 'AUTH_001',
      message: 'Invalid Request',
      data: req.body,
    }
    res.send(JSON.stringify(response));
    return
  }

  if (authJson.username != req.body.username || authJson.password != req.body.password) {
    var response = {
      type: 'ERROR',
      code: 'AUTH_002',
      message: 'Invalid Username or Password',
      data: req.body,
    }
    res.send(JSON.stringify(response));
    return
  }

  const data = {
    user: authJson.username,
  }

  var token = jwt.sign(data, authJson.secret, {
    expiresIn: 60*60*24,
  });

  //check password is valid
  var response = {
    type: 'SUCCESS',
    code: 'AUTH_002',
    message: 'Successful Login',
    data: data,
    token: token,
  }

  res.send(JSON.stringify(response));
  return

});

router.post('/account', function(req, res, next) {

  //check if command on allowed list
  if (!req.body || !req.body.id){
    var response = {
      type: 'ERROR',
      code: 'ACC_001',
      message: 'Invalid Request',
      data: req.body,
    }
    res.send(JSON.stringify(response));
    return
  }

  //@TODO: check the request is for the logged in user

  if (req.body.id != 1) {
    var response = {
      type: 'ERROR',
      code: 'ACC_002',
      message: 'User Not Found',
      data: req.body,
    }
    res.send(JSON.stringify(response));
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
  res.send(JSON.stringify(response));
  return

});

module.exports = router;
