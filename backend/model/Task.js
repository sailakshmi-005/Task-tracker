const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
    },

    title: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    dueDate: {
        type: Date
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    }
    
});

module.exports = mongoose.model("Task", taskSchema);
