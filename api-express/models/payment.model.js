// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    paymentCurrency: {type: String, enum: ['NAV', 'BTC']},
    paymentCurrencySpotBTC: Number,
    bitcoinSpotUSD: Number,
    paymentCurrencyCalcUSD: Number,
    depositAddress: String,
    depositStatus: {type: String, enum: ['Pending', 'Cancelled', 'Complete', 'Expired']},
    orderID: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});


//Export function to create "SomeModel" model class
module.exports = mongoose.model('Payment', PaymentSchema );
