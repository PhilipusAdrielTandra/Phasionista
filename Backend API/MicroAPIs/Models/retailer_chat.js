const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_chat', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    openchat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_openchat_retail',
        key: 'id'
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
        name: "openchat_id",
        using: "BTREE",
        fields: [
          { name: "openchat_id" },
        ]
      },
    ]
  });
};
