var DataTypes = require("sequelize").DataTypes;
var _payment_methods = require("./payment_methods");

function initModels(sequelize) {
  var payment_methods = _payment_methods(sequelize, DataTypes);


  return {
    payment_methods,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
