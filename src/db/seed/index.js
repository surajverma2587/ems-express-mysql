const sequelize = require("../../config/connection");

const { Department, Role, Employee } = require("../../models");
const departments = require("./data/departments.json");
const roles = require("./data/roles.json");
const employees = require("./data/employees.json");

const seed = async () => {
  await sequelize.sync({ force: true });

  await Department.bulkCreate(departments);
  console.log("Departments seeded successfully");

  await Role.bulkCreate(roles);
  console.log("Roles seeded successfully");

  await Employee.bulkCreate(employees);
  console.log("Employees seeded successfully");

  await Employee.update({ manager_id: 3 }, { where: { id: 1 } });
  await Employee.update({ manager_id: 3 }, { where: { id: 2 } });
  await Employee.update({ manager_id: 4 }, { where: { id: 3 } });
  await Employee.update({ manager_id: 5 }, { where: { id: 4 } });
  await Employee.update({ manager_id: 2 }, { where: { id: 9 } });

  process.exit(0);
};

seed();
