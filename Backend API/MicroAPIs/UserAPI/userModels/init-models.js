var DataTypes = require("sequelize").DataTypes;
var _user_address = require("./user_address");
var _user_promotions = require("./user_promotions");
var _user_recommendations = require("./user_recommendations");
var _user_reviews = require("./user_reviews");
var _user_transactions = require("./user_transactions");
var _user_wishlist = require("./user_wishlist");
var _users_detail = require("./users_detail");

function initModels(sequelize) {
  var user_address = _user_address(sequelize, DataTypes);
  var user_promotions = _user_promotions(sequelize, DataTypes);
  var user_recommendations = _user_recommendations(sequelize, DataTypes);
  var user_reviews = _user_reviews(sequelize, DataTypes);
  var user_transactions = _user_transactions(sequelize, DataTypes);
  var user_wishlist = _user_wishlist(sequelize, DataTypes);
  var users_detail = _users_detail(sequelize, DataTypes);

  user_address.belongsTo(users_detail, { as: "user", foreignKey: "user_id"});
  users_detail.hasMany(user_address, { as: "user_addresses", foreignKey: "user_id"});
  user_promotions.belongsTo(users_detail, { as: "user", foreignKey: "user_id"});
  users_detail.hasMany(user_promotions, { as: "user_promotions", foreignKey: "user_id"});
  user_recommendations.belongsTo(users_detail, { as: "user", foreignKey: "user_id"});
  users_detail.hasMany(user_recommendations, { as: "user_recommendations", foreignKey: "user_id"});
  user_reviews.belongsTo(users_detail, { as: "user", foreignKey: "user_id"});
  users_detail.hasMany(user_reviews, { as: "user_reviews", foreignKey: "user_id"});
  user_transactions.belongsTo(users_detail, { as: "user", foreignKey: "user_id"});
  users_detail.hasMany(user_transactions, { as: "user_transactions", foreignKey: "user_id"});
  user_wishlist.belongsTo(users_detail, { as: "user", foreignKey: "user_id"});
  users_detail.hasMany(user_wishlist, { as: "user_wishlists", foreignKey: "user_id"});

  return {
    user_address,
    user_promotions,
    user_recommendations,
    user_reviews,
    user_transactions,
    user_wishlist,
    users_detail,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
