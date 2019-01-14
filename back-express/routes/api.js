var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var authController = require('./auth.controller');
var accountController = require('./account.controller');

/* JWT Middleware */
router.use(function(req, res, next) {
  if(req.originalUrl == '/api/auth/login' || req.originalUrl == '/api/auth/register'){
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
  var email = req.body.email
  var password = req.body.password
  authController.login({email, password}, function(authenticated, response){
    res.send(JSON.stringify(response))
    return
  });
});

router.post('/auth/register', function(req, res) {
  var email = req.body.email
  var password = req.body.password
  authController.register({email, password}, function(authenticated, response){
    res.send(JSON.stringify(response))
    return
  });
});

router.post('/account', function(req, res, next) {
  var id = req.body.id
  accountController.getOverview({id}, function(accountAvailable, response){
    res.send(JSON.stringify(response))
    return
  });
});

module.exports = router;
