const Department = require("./department");
const Role = require("./role");
const Employee = require("./employee");

Role.belongsTo(Department, {
  foreignKey: "department_id",
});

Department.hasMany(Role, {
  foreignKey: "department_id",
});

Employee.belongsTo(Role, {
  foreignKey: "role_id",
});

Role.hasMany(Employee, {
  foreignKey: "role_id",
});

module.exports = { Department, Role, Employee };
