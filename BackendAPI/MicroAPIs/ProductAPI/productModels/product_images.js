const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_images', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'product_details',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_images',
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
        name: "fk_product_images_product_details",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
