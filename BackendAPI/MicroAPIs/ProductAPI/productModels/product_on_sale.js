const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_on_sale', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiry: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    product_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'product_details',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_on_sale',
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
        name: "fk_product_on_sale_product_details",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
