const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_bundle_product_details', {
    bundle_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product_bundle',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product_details',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_bundle_product_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bundle_id" },
          { name: "product_id" },
        ]
      },
      {
        name: "fk_product_bundle_product_details_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
