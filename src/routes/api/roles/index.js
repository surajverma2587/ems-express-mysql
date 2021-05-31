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
  try {
    const data = await Role.create({
      title: req.body.title,
      salary: req.body.salary,
      department_id: req.body.department_id,
    });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create role" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Role.update(
      {
        title: req.body.title,
        salary: req.body.salary,
        department_id: req.body.department_id,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update role" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Role.destroy({ where: { id } });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete role" });
  }
});

module.exports = router;
