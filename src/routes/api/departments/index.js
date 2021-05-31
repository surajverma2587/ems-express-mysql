const { Router } = require("express");
const { Department, Role, Employee } = require("../../../models");

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

router.get("/:id/employees", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ["title", "salary", "id"],
          include: [
            { model: Employee, attributes: ["first_name", "last_name", "id"] },
          ],
        },
      ],
    });
    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get roles within department" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Department.create({
      name: req.body.name,
    });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create department" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Department.update(
      {
        name: req.body.name,
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
    res.status(500).json({ error: "Failed to update department" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Department.destroy({ where: { id } });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete department" });
  }
});

module.exports = router;
