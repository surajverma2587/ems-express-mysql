const { Router } = require("express");
const { Department, Role } = require("../../../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get all departments" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get department" });
  }
});

router.get("/:id/roles", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id, {
      include: [{ model: Role, attributes: ["title", "salary", "id"] }],
    });
    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get roles within department" });
  }
});

router.get("/:id/employees", (req, res) => {
  res.send("get employees for a department");
});

router.post("/", (req, res) => {
  res.send("create a department");
});

router.put("/:id", (req, res) => {
  res.send("update a department");
});

router.delete("/:id", (req, res) => {
  res.send("delete a department");
});

module.exports = router;
