const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_location', {
    id: {
      type: DataTypes.INTEGER,
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
    region: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'retailer_location',
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
        name: "retailer_location_fk1",
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
        ]
      },
    ]
  });
};
