var express = require('express');
var router = express.Router();
var lodash = require('lodash');
const config = require('config');

var bittrexController = require('../controllers/bittrex.controller');

/* JWT Middleware */
router.use(function(req, res, next) {

  if(config.whitelist.includes(req.connection.remoteAddress)){
    next()
    return
  }

  var response = {
    type: 'ERROR',
    code: 'MIDDLEWARE_001',
    message: 'Not Authorized',
  }
  res.send(JSON.stringify(response))
  return
});

/* ROUTES */
router.get('/', function(req, res) {
  res.send('API Works');
});

router.post('/bittrex/test', function(req, res) {
  var id = 1;
  bittrexController.test({id}, function(success, response){
    res.send(JSON.stringify(response))
    return
  });
});

module.exports = router;
