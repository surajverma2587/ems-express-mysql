const Department = require("./department");
const Role = require("./role");

Role.belongsTo(Department, {
  foreignKey: "department_id",
});

Department.hasMany(Role, {
  foreignKey: "department_id",
});

module.exports = { Department, Role };
