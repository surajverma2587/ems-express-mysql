const { Router } = require("express");

const departments = require("./departments");
const roles = require("./roles");
const employees = require("./employees");

const router = Router();

router.use("/departments", departments);
router.use("/roles", roles);
router.use("/employees", employees);

module.exports = router;
