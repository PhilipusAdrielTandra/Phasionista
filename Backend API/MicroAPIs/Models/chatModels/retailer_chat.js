const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_chat', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    openchat_uuid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user_openchat_retail',
        key: 'uuid'
      }
    }
  }, {
    sequelize,
    tableName: 'retailer_chat',
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
        name: "openchat_uuid",
        using: "BTREE",
        fields: [
          { name: "openchat_uuid" },
        ]
      },
    ]
  });
};
