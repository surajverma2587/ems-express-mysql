const { Router } = require("express");
const { Department, Role, Employee } = require("../../../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: Department, attributes: ["id", "name"] }],
    });
    res.json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get all roles" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: [{ model: Department, attributes: ["id", "name"] }],
    });
    res.json(role);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get role" });
  }
});

router.get("/:id/employees", async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: [
        {
          model: Employee,
          attributes: ["first_name", "last_name", "id"],
        },
      ],
    });
    res.json(role);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get employees within role" });
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
