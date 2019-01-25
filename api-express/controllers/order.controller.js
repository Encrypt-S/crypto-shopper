var lodash = require('lodash');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var validator = require('../lib/validator')
const config = require('config');
var request = require('request');
var mongoose = require('mongoose');

var UserModel = require('../models/user.model');
var AddressModel = require('../models/address.model');
var OrderModel = require('../models/order.model');

var userValidator = {
  email: ["EMAIL_ADDRESS"],
}

var addressValidator = {
  country: ["STRING", "MAX_LENGTH:63"],
  fullName: ["STRING", "MAX_LENGTH:63"],
  address1: ["STRING", "MAX_LENGTH:63"],
  address2: ["STRING", "MAX_LENGTH:63"],
  city: ["STRING", "MAX_LENGTH:63"],
  region: ["STRING", "MAX_LENGTH:63"],
  zip: ["STRING", "MAX_LENGTH:63"],
  phone: ["STRING", "MAX_LENGTH:63"],
  instructions: ["STRING", "MAX_LENGTH:255"],
  access: ["STRING", "MAX_LENGTH:255"],
}

var orderValidator = {
  url: ["URL"],
  retailerCode: ["STRING", "MAX_LENGTH:63"],
  productCode: ["STRING", "MAX_LENGTH:63"],
  productPrice: ["CURRENCY"],
  shippingCost: ["CURRENCY"],
  quantity: ["INT", "GREATER_THAN:1"],
  quotedCost: ["CURRENCY"],
}

//setup database

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/navshopper';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var orderController = {}

orderController.create  = (params, callback) => {
  console.log('orderController.create')
  if (!validator.params(params, ['user', 'address', 'order'])) {
    var response = {
      type: 'ERROR',
      code: 'ORDER_CREATE_001',
      message: 'Invalid Params',
    }
    callback(false, response)
    return
  }

  var userErrors = validator.validate(params.user, userValidator);
  var addressErrors = validator.validate(params.address, addressValidator);
  var orderErrors = validator.validate(params.order, orderValidator);

  if (userErrors || addressErrors || orderErrors) {
    var response = {
      type: 'ERROR',
      code: 'ORDER_CREATE_002',
      message: 'Invalid Values',
      error: {
        user: userErrors || undefined,
        address: addressErrors || undefined,
        order: orderErrors || undefined,
      }
    }
    callback(false, response)
    return
  }

  orderController.currentOrder = {}

  //@TODO sanitise inputs

  createUser(params, createAddress, callback)

  return

  //create address

  //create order

  //create address

  var response = {
    type: 'SUCCESS',
    code: 'ORDER_CREATE_002',
    message: 'Created Order',
    data: {},
  }
  callback(true, response)
  return
}

function createUser(params, next, callback) {

  var userData = {
    email: params.user.email
  }

  UserModel.create(userData, function (err, newUser) {
    if (err) {
      var response = {
        type: 'ERROR',
        code: 'ORDER_CREATE_003',
        message: 'Unable to save user',
        error: err,
      }
      callback(false, response)
      return
    }
    console.log('newUser', newUser)
    orderController.currentOrder.user = newUser
    next(params, newUser, createOrder, callback)
  })
}

function createAddress(params, user, next, callback) {

  var addressData = {
    country: params.address.country,
    fullName: params.address.fullName,
    address1: params.address.address1,
    address2: params.address.address2,
    city: params.address.city,
    region: params.address.region,
    zip: params.address.zip,
    phone: params.address.phone,
    instructions: params.address.instructions,
    access: params.address.access,
    userID: user.id,
  }

  AddressModel.create(addressData, function (err, newAddress) {
    if (err) {
      var response = {
        type: 'ERROR',
        code: 'ORDER_CREATE_004',
        message: 'Unable to save address',
        error: err,
      }
      callback(false, response)
      return
    }
    console.log('newAddress', newAddress)
    orderController.currentOrder.address = newAddress
    next(params, newAddress, callback)
  })
}

function createOrder(params, address, callback) {

  var orderData = {
    url: params.order.url,
    retailerCode:  params.order.retailerCode,
    productCode:  params.order.productCode,
    productPrice:  params.order.productPrice,
    shippingCost:  params.order.shippingCost,
    quantity:  params.order.quantity,
    quotedCost:  params.order.quotedCost,
    addressID: address.id,
    orderStatus: 'Pending',
  }

  OrderModel.create(orderData, function (err, newOrder) {
    if (err) {
      var response = {
        type: 'ERROR',
        code: 'ORDER_CREATE_005',
        message: 'Unable to save order',
        error: err,
      }
      callback(false, response)
      return
    }
    console.log('newOrder', newOrder)
    orderController.currentOrder.order = newOrder
    console.log('orderController.currentOrder', orderController.currentOrder)
    var response = {
      type: 'SUCCESS',
      code: 'ORDER_CREATE_006',
      message: 'Order created',
      data: {
        orderID: newOrder.id
      },
    }
    callback(true, response)
    return
  })
}


module.exports = orderController
