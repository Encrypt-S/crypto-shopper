// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    country: String,
    fullName: String,
    address1: String,
    address2: String,
    city: String,
    region: String,
    zip: String,
    phone: String,
    instructions: String,
    access: String,
    userID: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});


//Export function to create "SomeModel" model class
module.exports = mongoose.model('Address', AddressSchema );
