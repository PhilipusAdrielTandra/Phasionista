const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_promotions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ObtainedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expiry: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_details',
        key: 'id'
      }
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ge_promotions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_promotions',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "promotion_id",
        using: "BTREE",
        fields: [
          { name: "promotion_id" },
        ]
      },
    ]
  });
};
