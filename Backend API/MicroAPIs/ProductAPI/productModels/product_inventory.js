const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_inventory', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ge_product_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ge_product_category',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'product_details',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_inventory',
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
        name: "fk_product_inventory_ge_product_category",
        using: "BTREE",
        fields: [
          { name: "ge_product_category_id" },
        ]
      },
      {
        name: "fk_product_inventory_product_details",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
