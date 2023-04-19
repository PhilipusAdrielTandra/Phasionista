var DataTypes = require("sequelize").DataTypes;
var __producttobundle = require("./_producttobundle");
var __producttoimages = require("./_producttoimages");
var __producttotype = require("./_producttotype");
var __producttovideo = require("./_producttovideo");
var __retailertotype = require("./_retailertotype");
var __retailertovideo = require("./_retailertovideo");
var _ge_product_category = require("./ge_product_category");
var _ge_product_type = require("./ge_product_type");
var _ge_promotions = require("./ge_promotions");
var _ge_retailer_type = require("./ge_retailer_type");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _payment_methods = require("./payment_methods");
var _product_bundle = require("./product_bundle");
var _product_details = require("./product_details");
var _product_images = require("./product_images");
var _product_inventory = require("./product_inventory");
var _product_on_sale = require("./product_on_sale");
var _product_ratings = require("./product_ratings");
var _product_videos = require("./product_videos");
var _product_virtual_model = require("./product_virtual_model");
var _retailer_chat = require("./retailer_chat");
var _retailer_details = require("./retailer_details");
var _retailer_images = require("./retailer_images");
var _retailer_location = require("./retailer_location");
var _retailer_ratings = require("./retailer_ratings");
var _retailer_videos = require("./retailer_videos");
var _user_address = require("./user_address");
var _user_cart = require("./user_cart");
var _user_chat = require("./user_chat");
var _user_details = require("./user_details");
var _user_openchat_retail = require("./user_openchat_retail");
var _user_payment_method = require("./user_payment_method");
var _user_promotions = require("./user_promotions");
var _user_recommendations = require("./user_recommendations");
var _user_reviews = require("./user_reviews");
var _user_transactions = require("./user_transactions");
var _user_wishlist = require("./user_wishlist");
var _users = require("./users");

function initModels(sequelize) {
  var _producttobundle = __producttobundle(sequelize, DataTypes);
  var _producttoimages = __producttoimages(sequelize, DataTypes);
  var _producttotype = __producttotype(sequelize, DataTypes);
  var _producttovideo = __producttovideo(sequelize, DataTypes);
  var _retailertotype = __retailertotype(sequelize, DataTypes);
  var _retailertovideo = __retailertovideo(sequelize, DataTypes);
  var ge_product_category = _ge_product_category(sequelize, DataTypes);
  var ge_product_type = _ge_product_type(sequelize, DataTypes);
  var ge_promotions = _ge_promotions(sequelize, DataTypes);
  var ge_retailer_type = _ge_retailer_type(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment_methods = _payment_methods(sequelize, DataTypes);
  var product_bundle = _product_bundle(sequelize, DataTypes);
  var product_details = _product_details(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var product_inventory = _product_inventory(sequelize, DataTypes);
  var product_on_sale = _product_on_sale(sequelize, DataTypes);
  var product_ratings = _product_ratings(sequelize, DataTypes);
  var product_videos = _product_videos(sequelize, DataTypes);
  var product_virtual_model = _product_virtual_model(sequelize, DataTypes);
  var retailer_chat = _retailer_chat(sequelize, DataTypes);
  var retailer_details = _retailer_details(sequelize, DataTypes);
  var retailer_images = _retailer_images(sequelize, DataTypes);
  var retailer_location = _retailer_location(sequelize, DataTypes);
  var retailer_ratings = _retailer_ratings(sequelize, DataTypes);
  var retailer_videos = _retailer_videos(sequelize, DataTypes);
  var user_address = _user_address(sequelize, DataTypes);
  var user_cart = _user_cart(sequelize, DataTypes);
  var user_chat = _user_chat(sequelize, DataTypes);
  var user_details = _user_details(sequelize, DataTypes);
  var user_openchat_retail = _user_openchat_retail(sequelize, DataTypes);
  var user_payment_method = _user_payment_method(sequelize, DataTypes);
  var user_promotions = _user_promotions(sequelize, DataTypes);
  var user_recommendations = _user_recommendations(sequelize, DataTypes);
  var user_reviews = _user_reviews(sequelize, DataTypes);
  var user_transactions = _user_transactions(sequelize, DataTypes);
  var user_wishlist = _user_wishlist(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  ge_product_category.belongsTo(ge_product_category, { as: "parent", foreignKey: "parent_id"});
  ge_product_category.hasMany(ge_product_category, { as: "ge_product_categories", foreignKey: "parent_id"});
  product_inventory.belongsTo(ge_product_category, { as: "ge_product_category", foreignKey: "ge_product_category_id"});
  ge_product_category.hasMany(product_inventory, { as: "product_inventories", foreignKey: "ge_product_category_id"});
  _producttotype.belongsTo(ge_product_type, { as: "type", foreignKey: "type_id"});
  ge_product_type.hasMany(_producttotype, { as: "_producttotypes", foreignKey: "type_id"});
  user_promotions.belongsTo(ge_promotions, { as: "promotion", foreignKey: "promotion_id"});
  ge_promotions.hasMany(user_promotions, { as: "user_promotions", foreignKey: "promotion_id"});
  _retailertotype.belongsTo(ge_retailer_type, { as: "type", foreignKey: "type_id"});
  ge_retailer_type.hasMany(_retailertotype, { as: "_retailertotypes", foreignKey: "type_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  orders.belongsTo(payment_methods, { as: "payment_method_payment_method", foreignKey: "payment_method"});
  payment_methods.hasMany(orders, { as: "orders", foreignKey: "payment_method"});
  _producttobundle.belongsTo(product_bundle, { as: "bundle", foreignKey: "bundle_id"});
  product_bundle.hasMany(_producttobundle, { as: "_producttobundles", foreignKey: "bundle_id"});
  _producttobundle.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(_producttobundle, { as: "_producttobundles", foreignKey: "product_id"});
  _producttoimages.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(_producttoimages, { as: "_producttoimages", foreignKey: "product_id"});
  _producttotype.belongsTo(product_details, { as: "user", foreignKey: "user_id"});
  product_details.hasMany(_producttotype, { as: "_producttotypes", foreignKey: "user_id"});
  _producttovideo.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(_producttovideo, { as: "_producttovideos", foreignKey: "product_id"});
  product_on_sale.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_on_sale, { as: "product_on_sales", foreignKey: "product_id"});
  product_ratings.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_ratings, { as: "product_ratings", foreignKey: "product_id"});
  product_virtual_model.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(product_virtual_model, { as: "product_virtual_models", foreignKey: "product_id"});
  retailer_details.belongsTo(product_details, { as: "products_product_detail", foreignKey: "products"});
  product_details.hasMany(retailer_details, { as: "retailer_details", foreignKey: "products"});
  user_cart.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(user_cart, { as: "user_carts", foreignKey: "product_id"});
  user_recommendations.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(user_recommendations, { as: "user_recommendations", foreignKey: "product_id"});
  user_transactions.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(user_transactions, { as: "user_transactions", foreignKey: "product_id"});
  user_wishlist.belongsTo(product_details, { as: "product", foreignKey: "product_id"});
  product_details.hasMany(user_wishlist, { as: "user_wishlists", foreignKey: "product_id"});
  _producttoimages.belongsTo(product_images, { as: "image", foreignKey: "images_id"});
  product_images.hasMany(_producttoimages, { as: "_producttoimages", foreignKey: "images_id"});
  order_items.belongsTo(product_inventory, { as: "product_inventory", foreignKey: "product_inventory_id"});
  product_inventory.hasMany(order_items, { as: "order_items", foreignKey: "product_inventory_id"});
  user_reviews.belongsTo(product_inventory, { as: "product_inventory", foreignKey: "product_inventory_id"});
  product_inventory.hasMany(user_reviews, { as: "user_reviews", foreignKey: "product_inventory_id"});
  _producttovideo.belongsTo(product_videos, { as: "video", foreignKey: "video_id"});
  product_videos.hasMany(_producttovideo, { as: "_producttovideos", foreignKey: "video_id"});
  _retailertotype.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(_retailertotype, { as: "_retailertotypes", foreignKey: "retailer_id"});
  _retailertovideo.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(_retailertovideo, { as: "_retailertovideos", foreignKey: "retailer_id"});
  product_details.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(product_details, { as: "product_details", foreignKey: "retailer_id"});
  retailer_ratings.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(retailer_ratings, { as: "retailer_ratings", foreignKey: "retailer_id"});
  user_openchat_retail.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(user_openchat_retail, { as: "user_openchat_retails", foreignKey: "retailer_id"});
  retailer_details.belongsTo(retailer_images, { as: "location_retailer_image", foreignKey: "location"});
  retailer_images.hasMany(retailer_details, { as: "retailer_details", foreignKey: "location"});
  retailer_details.belongsTo(retailer_location, { as: "images_retailer_location", foreignKey: "images"});
  retailer_location.hasMany(retailer_details, { as: "retailer_details", foreignKey: "images"});
  _retailertovideo.belongsTo(retailer_videos, { as: "video", foreignKey: "video_id"});
  retailer_videos.hasMany(_retailertovideo, { as: "_retailertovideos", foreignKey: "video_id"});
  product_ratings.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(product_ratings, { as: "product_ratings", foreignKey: "user_id"});
  retailer_ratings.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(retailer_ratings, { as: "retailer_ratings", foreignKey: "user_id"});
  user_cart.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(user_cart, { as: "user_carts", foreignKey: "user_id"});
  user_openchat_retail.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(user_openchat_retail, { as: "user_openchat_retails", foreignKey: "user_id"});
  user_payment_method.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(user_payment_method, { as: "user_payment_methods", foreignKey: "user_id"});
  user_promotions.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(user_promotions, { as: "user_promotions", foreignKey: "user_id"});
  user_recommendations.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(user_recommendations, { as: "user_recommendations", foreignKey: "user_id"});
  user_transactions.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(user_transactions, { as: "user_transactions", foreignKey: "user_id"});
  user_wishlist.belongsTo(user_details, { as: "user", foreignKey: "user_id"});
  user_details.hasMany(user_wishlist, { as: "user_wishlists", foreignKey: "user_id"});
  retailer_chat.belongsTo(user_openchat_retail, { as: "openchat", foreignKey: "openchat_id"});
  user_openchat_retail.hasMany(retailer_chat, { as: "retailer_chats", foreignKey: "openchat_id"});
  user_chat.belongsTo(user_openchat_retail, { as: "openchat", foreignKey: "openchat_id"});
  user_openchat_retail.hasMany(user_chat, { as: "user_chats", foreignKey: "openchat_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  payment_methods.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(payment_methods, { as: "payment_methods", foreignKey: "user_id"});
  user_address.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_address, { as: "user_addresses", foreignKey: "user_id"});
  user_reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_reviews, { as: "user_reviews", foreignKey: "user_id"});

  return {
    _producttobundle,
    _producttoimages,
    _producttotype,
    _producttovideo,
    _retailertotype,
    _retailertovideo,
    ge_product_category,
    ge_product_type,
    ge_promotions,
    ge_retailer_type,
    order_items,
    orders,
    payment_methods,
    product_bundle,
    product_details,
    product_images,
    product_inventory,
    product_on_sale,
    product_ratings,
    product_videos,
    product_virtual_model,
    retailer_chat,
    retailer_details,
    retailer_images,
    retailer_location,
    retailer_ratings,
    retailer_videos,
    user_address,
    user_cart,
    user_chat,
    user_details,
    user_openchat_retail,
    user_payment_method,
    user_promotions,
    user_recommendations,
    user_reviews,
    user_transactions,
    user_wishlist,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
