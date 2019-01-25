// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    url: String,
    retailerCode: {type: String, enum: ['AMAZON', 'GYFT', 'UBER']},
    productCode: String,
    productPrice: Number,
    shippingCost: Number,
    quantity: Number,
    quotedCost: Number,
    addressID: String,
    orderStatus: {type: String, enum: ['Pending', 'Cancelled', 'Complete', 'Expired']},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});


//Export function to create "SomeModel" model class
module.exports = mongoose.model('Order', OrderSchema );
