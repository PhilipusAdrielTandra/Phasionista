const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailer_details', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    retailer_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_id:{
      type: DataTypes.STRING(36),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    shop_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'retailer_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
