const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_openchat_retail', {
    id: {
      autoIncrement: true,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: "uuid"
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    retailer_id: {
      type: DataTypes.UUID,
      allowNull: false
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
        name: "uuid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};
