const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more then 20 characters"],
  },
  completed: { type: Boolean, default: false },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "please provide a user"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
