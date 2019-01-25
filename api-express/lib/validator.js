var lodash = require('lodash');
const validator = require('validator');

/* EXAMPLE VALIDATION OBJECT

var exampleValidator = {
  email: ["EMAIL_ADDRESS"],
  fullName: ["STRING", "MAX_LENGTH:63"],
  url: ["URL"],
  productPrice: ["CURRENCY"],
  quantity: ["INT", "GREATER_THAN:1"],
}

*/

var dataValidator = {}

dataValidator.params  = (params, required) => {
  if (lodash.intersection(Object.keys(params), required).length !== required.length) {
    return false
  } else {
    return true
  }
}

dataValidator.validate = (object, validation) => {

  dataValidator.errors = []

  for (const key in validation) {
    if (!object[key]) {
      dataValidator.errors.push({key: key, code: "VALIDATOR_001", message: "Value not found"})
    } else {
      for(var i=0; i<validation[key].length;i++){
        var rule = validation[key][i].split(':')
        switch(rule[0]){
          case "EMAIL_ADDRESS":
            if(!validator.isEmail(object[key])) {
              dataValidator.errors.push({key: key, code: "VALIDATOR_003", message: "Email validation failed"})
            }
          break;
          case "STRING":
            if(validator.isEmpty(object[key])) {
              dataValidator.errors.push({key: key, code: "VALIDATOR_004", message: "String is empty"})
            }
          break;
          case "MAX_LENGTH":
            if(!validator.isLength(object[key], {min: 1, max: rule[1]})) {
              dataValidator.errors.push({key: key, code: "VALIDATOR_005", message: "String is too long"})
            }
          break;
          case "URL":
            if(!validator.isURL(object[key])) {
              dataValidator.errors.push({key: key, code: "VALIDATOR_006", message: "Invalid URL"})
            }
          break;
          case "CURRENCY":
            if(!validator.isDecimal(object[key], {force_decimal: true, decimal_digits: 2})) {
              dataValidator.errors.push({key: key, code: "VALIDATOR_007", message: "Currency format not recognised"})
            }
          break;
          case "INT":
            if(!validator.isInt(object[key])) {
              dataValidator.errors.push({key: key, code: "VALIDATOR_008", message: "Is not an integer"})
            }
          break;
          case "GREATER_THAN":
            if(!validator.isFloat(object[key], {min: 1, max: rule[1]})) {
              dataValidator.errors.push({key: key, code: "VALIDATOR_009", message: "Number is too small"})
            }
          break;
          default:
          dataValidator.errors.push({key: key, code: "VALIDATOR_002", message: "Validation method unknown"})
        }

      }
    }
  }

  if (Object.keys(dataValidator.errors).length === 0) {
    return false
  } else {
    return dataValidator.errors
  }
}

module.exports = dataValidator
