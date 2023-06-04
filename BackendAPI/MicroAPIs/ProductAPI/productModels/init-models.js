var DataTypes = require("sequelize").DataTypes;
var _ge_product_category = require("./ge_product_category");
var _product_bundle = require("./product_bundle");
var _product_bundle_product_details = require("./product_bundle_product_details");
var _product_details = require("./product_details");
var _product_images = require("./product_images");
var _product_inventory = require("./product_inventory");
var _product_on_sale = require("./product_on_sale");
var _product_ratings = require("./product_ratings");
var _product_videos = require("./product_videos");
var _product_virtual_model = require("./product_virtual_model");

function initModels(sequelize) {
  var ge_product_category = _ge_product_category(sequelize, DataTypes);
  var product_bundle = _product_bundle(sequelize, DataTypes);
  var product_bundle_product_details = _product_bundle_product_details(sequelize, DataTypes);
  var product_details = _product_details(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var product_inventory = _product_inventory(sequelize, DataTypes);
  var product_on_sale = _product_on_sale(sequelize, DataTypes);
  var product_ratings = _product_ratings(sequelize, DataTypes);
  var product_videos = _product_videos(sequelize, DataTypes);
  var product_virtual_model = _product_virtual_model(sequelize, DataTypes);

  product_bundle.belongsToMany(product_details, { as: 'product_id_product_details', through: product_bundle_product_details, foreignKey: "bundle_id", otherKey: "product_id" });
  product_details.belongsToMany(product_bundle, { as: 'bundle_id_product_bundles', through: product_bundle_product_details, foreignKey: "product_id", otherKey: "bundle_id" });
  ge_product_category.hasMany(product_inventory, { as: "product_inventories", foreignKey: "ge_product_category_id"});
  product_bundle_product_details.belongsTo(product_bundle, { as: "bundle", foreignKey: "bundle_id"});
  product_bundle.hasMany(product_bundle_product_details, { as: "product_bundle_product_details", foreignKey: "bundle_id"});
  product_bundle_product_details.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_bundle_product_details, { as: "product_bundle_product_details", foreignKey: "product_id"});
  product_images.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_images, { as: "image", foreignKey: "product_id"});
  product_inventory.belongsTo(product_details, { as: "variations", foreignKey: "product_id"});
  product_details.hasMany(product_inventory, { as: "variations", foreignKey: "product_id"});
  product_on_sale.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_on_sale, { as: "product_on_sales", foreignKey: "product_id"});
  product_ratings.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_ratings, { as: "product_ratings", foreignKey: "product_id"});
  product_videos.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_videos, { as: "product_videos", foreignKey: "product_id"});
  product_virtual_model.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_virtual_model, { as: "product_virtual_models", foreignKey: "product_id"});

  return {
    ge_product_category,
    product_bundle,
    product_bundle_product_details,
    product_details,
    product_images,
    product_inventory,
    product_on_sale,
    product_ratings,
    product_videos,
    product_virtual_model,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
