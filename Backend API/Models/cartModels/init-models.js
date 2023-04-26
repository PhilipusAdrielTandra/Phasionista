var DataTypes = require("sequelize").DataTypes;
var _user_cart = require("./user_cart");

function initModels(sequelize) {
  var user_cart = _user_cart(sequelize, DataTypes);


  return {
    user_cart,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
