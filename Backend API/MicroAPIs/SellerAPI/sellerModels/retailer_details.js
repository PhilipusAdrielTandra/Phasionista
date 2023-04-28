const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_details', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    retailer_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    retailer_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ge_retailer_type',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    shop_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    products: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_location',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'retailer_details',
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
      {
        name: "retailer_details_fk1",
        using: "BTREE",
        fields: [
          { name: "retailer_type_id" },
        ]
      },
      {
        name: "retailer_details_fk2",
        using: "BTREE",
        fields: [
          { name: "location_id" },
        ]
      },
    ]
  });
};
