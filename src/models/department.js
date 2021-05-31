const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 30],
    },
  },
};

const options = {
  sequelize,
  modelName: "department",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

class Department extends Model {}

Department.init(schema, options);

module.exports = Department;
