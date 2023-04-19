const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_producttobundle', {
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
    bundle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_bundle',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: '_producttobundle',
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
        name: "bundle_id",
        using: "BTREE",
        fields: [
          { name: "bundle_id" },
        ]
      },
    ]
  });
};
