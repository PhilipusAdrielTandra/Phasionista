const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_detail', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.uuidv4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    about: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    club_level: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'users_detail',
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
