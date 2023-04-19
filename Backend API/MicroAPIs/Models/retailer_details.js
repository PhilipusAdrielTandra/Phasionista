const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_details', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    retailer_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    retailer_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    ShopLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    products: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_details',
        key: 'id'
      }
    },
    images: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_location',
        key: 'id'
      }
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_images',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'retailer_details',
    timestamps: true,
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
        name: "fk_products",
        using: "BTREE",
        fields: [
          { name: "products" },
        ]
      },
      {
        name: "fk_images",
        using: "BTREE",
        fields: [
          { name: "images" },
        ]
      },
      {
        name: "fk_location",
        using: "BTREE",
        fields: [
          { name: "location" },
        ]
      },
    ]
  });
};
