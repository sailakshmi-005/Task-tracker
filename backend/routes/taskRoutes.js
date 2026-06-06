const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.delete("/:id", authMiddleware, taskController.deleteTask);
router.put("/:id", authMiddleware, taskController.updateTask);

module.exports = router;
