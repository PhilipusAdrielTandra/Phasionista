var DataTypes = require("sequelize").DataTypes;
var _order_items = require("./order_items");
var _orders = require("./orders");

function initModels(sequelize) {
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);

  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});

  return {
    order_items,
    orders,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
