const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user.id
    });

    await task.save();
    res.json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deleted = await Task.findByIdAndDelete(taskId);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {

  try {

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};
