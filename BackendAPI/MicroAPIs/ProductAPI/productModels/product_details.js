const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_details', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    retailer_id: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    saleCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    fullDescription: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
