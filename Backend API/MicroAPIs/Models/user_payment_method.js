const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_payment_method', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    payment_method_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    card_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    card_expiry: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paypal_email: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_details',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_payment_method',
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
    ]
  });
};
