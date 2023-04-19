const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_openchat_retail', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_details',
        key: 'id'
      }
    },
    retailer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_details',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_openchat_retail',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "retailer_id",
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
        ]
      },
    ]
  });
};
