// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ExchangeSchema = new Schema({
    exchange: {type: String, enum: ['Bittrex', 'Dasset']},
    from: {type: String, enum: ['NAV', 'BTC']},
    to: {type: String, enum: ['BTC', 'USD']},
    rate: Number,
    fee: Number,
    value: Number,
    tradeID: String,
    tradeStatus: {type: String, enum: ['Pending', 'Complete', 'Cancelled']},
    paymentID: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});


//Export function to create "SomeModel" model class
module.exports = mongoose.model('Exchange', ExchangeSchema );
