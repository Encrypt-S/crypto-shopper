var lodash = require('lodash');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var validator = require('../lib/validator')
const config = require('config');
var request = require('request');

var explorerController = {}

explorerController.getMarketRate  = (params, callback) => {

  if (!validator.params(params, ['market'])) {
    var response = {
      type: 'ERROR',
      code: 'EXPLORER_MARKET_RATE_001',
      message: 'Invalid Params',
    }
    callback(false, response)
    return
  }

  if (!config.available_markets.includes(params.market)) {
    var response = {
      type: 'ERROR',
      code: 'EXPLORER_MARKET_RATE_002',
      message: 'Invalid Market',
    }
    callback(false, response)
    return
  }

  explorerController.marketData = {}

  getRequestedMarket(params.market, getBtcMarket, callback)
}

function getRequestedMarket(market, next, callback) {
  request.get(config.bittrex_endpoints[market], (err, res, body) => {
    if (err) {
      var response = {
        type: 'ERROR',
        code: 'EXPLORER_MARKET_RATE_003',
        message: 'Unable to fetch requested market',
        error: err,
      }
      callback(false, response)
      return
    }
    var bodyJson = JSON.parse(body);
    explorerController.marketData['BTC-' + market] = bodyJson.result.Bid
    next(market, calcUSD, callback)
    return
  })
}

function getBtcMarket(market, next, callback) {
  request.get(config.bittrex_endpoints.BTC, (err, res, body) => {
    if (err) {
      var response = {
        type: 'ERROR',
        code: 'EXPLORER_MARKET_RATE_004',
        message: 'Unable to fetch requested market',
        error: err,
      }
      callback(false, response)
      return
    }
    var bodyJson = JSON.parse(body);
    explorerController.marketData['BTC-USD'] = bodyJson.result.Bid
    next(market, callback)
    return
  })
}

function calcUSD(market, callback) {

  explorerController.marketData[market + '-USD'] = explorerController.marketData['BTC-USD'] * explorerController.marketData['BTC-' + market]
  var response = {
    type: 'SUCCESS',
    code: 'EXPLORER_MARKET_RATE_100',
    message: 'Rates Retrieved',
    data: explorerController.marketData,
  }
  callback(true, response)
  return
}

module.exports = explorerController
