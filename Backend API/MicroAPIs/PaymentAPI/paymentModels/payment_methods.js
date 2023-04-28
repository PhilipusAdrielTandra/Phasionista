const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_methods', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    card_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    card_number: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment_methods',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};
