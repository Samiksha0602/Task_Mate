const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  category: String,
  done: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = mongoose.model(
  "todos",
  TodoSchema
);

module.exports = TodoModel;
