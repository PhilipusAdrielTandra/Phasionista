var DataTypes = require("sequelize").DataTypes;
var _ge_retailer_type = require("./ge_retailer_type");
var _retailer_details = require("./retailer_details");
var _retailer_images = require("./retailer_images");
var _retailer_location = require("./retailer_location");
var _retailer_ratings = require("./retailer_ratings");
var _retailer_videos = require("./retailer_videos");

function initModels(sequelize) {
  var ge_retailer_type = _ge_retailer_type(sequelize, DataTypes);
  var retailer_details = _retailer_details(sequelize, DataTypes);
  var retailer_images = _retailer_images(sequelize, DataTypes);
  var retailer_location = _retailer_location(sequelize, DataTypes);
  var retailer_ratings = _retailer_ratings(sequelize, DataTypes);
  var retailer_videos = _retailer_videos(sequelize, DataTypes);

  retailer_details.belongsTo(ge_retailer_type, { as: "retailer_type", foreignKey: "retailer_type_id"});
  ge_retailer_type.hasMany(retailer_details, { as: "retailer_details", foreignKey: "retailer_type_id"});
  retailer_images.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(retailer_images, { as: "retailer_images", foreignKey: "retailer_id"});
  retailer_location.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(retailer_location, { as: "retailer_locations", foreignKey: "retailer_id"});
  retailer_ratings.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(retailer_ratings, { as: "retailer_ratings", foreignKey: "retailer_id"});
  retailer_videos.belongsTo(retailer_details, { as: "retailer", foreignKey: "retailer_id"});
  retailer_details.hasMany(retailer_videos, { as: "retailer_videos", foreignKey: "retailer_id"});
  retailer_details.belongsTo(retailer_location, { as: "location", foreignKey: "location_id"});
  retailer_location.hasMany(retailer_details, { as: "retailer_details", foreignKey: "location_id"});

  return {
    ge_retailer_type,
    retailer_details,
    retailer_images,
    retailer_location,
    retailer_ratings,
    retailer_videos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
