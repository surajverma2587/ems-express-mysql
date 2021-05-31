const { Router } = require("express");
const { Department, Role, Employee } = require("../../../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: Role,
          attributes: ["id", "title", "salary"],
          include: {
            model: Department,
            attributes: ["id", "name"],
          },
        },
        {
          model: Employee,
          as: "manager",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get all employees" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ["id", "title", "salary"],
          include: {
            model: Department,
            attributes: ["id", "name"],
          },
        },
        {
          model: Employee,
          as: "manager",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get employee" });
  }
});

router.post("/", async (req, res) => {
  res.send("create a department");
});

router.put("/:id", async (req, res) => {
  res.send("update a department");
});

router.delete("/:id", async (req, res) => {
  res.send("delete a department");
});

module.exports = router;
