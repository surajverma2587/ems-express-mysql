const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 30],
    },
  },
  salary: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 999999.99,
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "department",
      key: "id",
    },
  },
};

const options = {
  sequelize,
  modelName: "role",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

class Role extends Model {}

Role.init(schema, options);

module.exports = Role;
