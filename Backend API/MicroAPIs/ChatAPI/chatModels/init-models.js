var DataTypes = require("sequelize").DataTypes;
var _retailer_chat = require("./retailer_chat");
var _user_chat = require("./user_chat");
var _user_openchat_retail = require("./user_openchat_retail");

function initModels(sequelize) {
  var retailer_chat = _retailer_chat(sequelize, DataTypes);
  var user_chat = _user_chat(sequelize, DataTypes);
  var user_openchat_retail = _user_openchat_retail(sequelize, DataTypes);

  retailer_chat.belongsTo(user_openchat_retail, { as: "openchat_uu", foreignKey: "openchat_uuid"});
  user_openchat_retail.hasMany(retailer_chat, { as: "retailer_chats", foreignKey: "openchat_uuid"});
  user_chat.belongsTo(user_openchat_retail, { as: "openchat_uu", foreignKey: "openchat_uuid"});
  user_openchat_retail.hasMany(user_chat, { as: "user_chats", foreignKey: "openchat_uuid"});

  return {
    retailer_chat,
    user_chat,
    user_openchat_retail,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
