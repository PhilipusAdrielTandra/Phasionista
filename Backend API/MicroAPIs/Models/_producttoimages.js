const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_producttoimages', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_details',
        key: 'id'
      }
    },
    images_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_images',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: '_producttoimages',
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
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "images_id",
        using: "BTREE",
        fields: [
          { name: "images_id" },
        ]
      },
    ]
  });
};
