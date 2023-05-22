const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_videos', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    retailer_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'retailer_details',
        key: 'id'
      }
    },
    product_id: {
        type: DataTypes.STRING(36),
        allowNull: false
    }
    
  }, {
    sequelize,
    tableName: 'retailer_products',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
        ]
      },
      {
        name: "retailer_products_fk1",
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
        ]
      },
    ]
  });
};
