const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_chat', {
    id: {
      autoIncrement: true,
      type: DataTypes.UUID,
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
    },
    userID: {
      type: DataTypes.STRING(36),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'user_chat',
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
