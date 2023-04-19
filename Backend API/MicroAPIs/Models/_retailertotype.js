const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_retailertotype', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    retailer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_details',
        key: 'id'
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ge_retailer_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: '_retailertotype',
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
        name: "retailer_id",
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
};
