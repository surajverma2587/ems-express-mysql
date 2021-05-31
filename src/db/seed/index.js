const sequelize = require("../../config/connection");

const { Department, Role } = require("../../models");
const departments = require("./data/departments.json");
const roles = require("./data/roles.json");

const seed = async () => {
  await sequelize.sync({ force: true });

  await Department.bulkCreate(departments);
  console.log("Departments seeded successfully");

  await Role.bulkCreate(roles);
  console.log("Roles seeded successfully");

  process.exit(0);
};

seed();
