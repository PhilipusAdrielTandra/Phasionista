const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_ratings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    Upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    retailer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'retailer_details',
        key: 'id'
      }
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
    tableName: 'retailer_ratings',
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
        name: "retailer_id",
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
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
