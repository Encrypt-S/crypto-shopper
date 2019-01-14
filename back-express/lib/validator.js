var lodash = require('lodash');


var validator = {}

validator.params  = (params, required) => {
  if (lodash.intersection(Object.keys(params), required).length !== required.length) {
    return false
  } else {
    return true
  }
}

module.exports = validator
