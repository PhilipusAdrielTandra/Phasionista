const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_retailertovideo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    retailer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_details',
        key: 'id'
      }
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_videos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: '_retailertovideo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "retailer_id",
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
        ]
      },
      {
        name: "video_id",
        using: "BTREE",
        fields: [
          { name: "video_id" },
        ]
      },
    ]
  });
};
