const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost:27017/test"
);

// Get all tasks
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Add a task
app.post("/add", (req, res) => {
  const {
    title,
    description,
    dueDate,
    category,
  } = req.body;
  TodoModel.create({
    title,
    description,
    dueDate,
    category,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Mark task as done (toggle true)
app.put("/update/:id", (req, res) => {
  const { id } = req.params;

  // If request body exists, update full task
  if (req.body.title) {
    const {
      title,
      description,
      dueDate,
      category,
      done,
    } = req.body;
    TodoModel.findByIdAndUpdate(id, {
      title,
      description,
      dueDate,
      category,
      done,
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    // Toggle done only
    TodoModel.findById(id)
      .then((task) => {
        task.done = !task.done;
        task
          .save()
          .then((result) => res.json(result));
      })
      .catch((err) => res.json(err));
  }
});

// Delete a task
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Start the server
app.listen(3001, () => {
  console.log(
    "✅ Server is running on port 3001"
  );
});
