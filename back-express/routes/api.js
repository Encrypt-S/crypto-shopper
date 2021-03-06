var express = require('express');
var router = express.Router();
var lodash = require('lodash');
const config = require('config');
var request = require('request');

var authController = require('../controllers/auth.controller');
var accountController = require('../controllers/account.controller');
var explorerController = require('../controllers/explorer.controller');

/* JWT Middleware */
router.use(function(req, res, next) {
  if(config.public_endpoints.includes(req.originalUrl)){
    next()
    return
  }
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  authController.validateToken({token}, function(validToken, response){
    if (validToken) {
      next()
      return
    }
    res.send(JSON.stringify(response))
    return
  });
});

/* ROUTES */
router.get('/', function(req, res) {
  res.send('Available endpoints [auth, account]');
});

router.post('/auth/login', function(req, res) {
  authController.login(req.body function(authenticated, response){
    res.send(JSON.stringify(response))
    return
  });
});

router.post('/auth/register', function(req, res) {
  authController.register(req.body, function(authenticated, response){
    res.send(JSON.stringify(response))
    return
  });
});

router.post('/account', function(req, res, next) {
  accountController.getOverview(req.body, function(accountAvailable, response){
    res.send(JSON.stringify(response))
    return
  });
});

router.post('/explorer/market-rates', function(req, res, next) {
  explorerController.getMarketRate(req.body, function(accountAvailable, response){
    res.send(JSON.stringify(response))
    return
  });
});

router.get('/ringfence/test', function(req, res, next) {

  request.post("https://localhost:5001/api/bittrex/test", (err, res2, body) => {
    if (err) {
      var response = {
        type: 'ERROR',
        code: 'RINGFENCE_TEST_001',
        message: 'Unable to talk to the ringfenced server',
        error: err,
      }
      res.send(JSON.stringify(response))
      return
    }

    var bodyJson = JSON.parse(body);
    console.log(bodyJson);
    var response = {
      type: 'SUCCESS',
      code: 'RINGFENCE_TEST_002',
      message: 'Talked to the ringfenced server',
      body: body,
    }
    res.send(JSON.stringify(response))
    return
  })

});

module.exports = router;
