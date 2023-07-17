const express = require("express");
const app = express();
app.use(express.json());

// Mock data for demonstration purposes
let todos = [
  { id: 1, task: "Finish homework" },
  { id: 2, task: "Go grocery shopping" },
  { id: 3, task: "Walk the dog" },
];

// Get all todos created by the user
app.get("/", (req, res) => {
  res.json(todos);
});

// Middleware to validate input
const validateInput = (req, res, next) => {
  if (!req.body.task) {
    return res.status(400).json({ error: "Task is required" });
  }
  next();
};

// Create a new todo
app.post("/add", validateInput, (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
  };
  todos.push(newTodo);
  res.json({ message: "Todo created successfully", data: todos });
});

// Update a todo by ID
app.put("/update/:id", validateInput, (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body.task;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todos[todoIndex].task = updatedTodo;
    res.json({ message: "Todo updated successfully", data: todos });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Delete a todo by ID
app.delete("/delete/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.json({ message: "Todo deleted successfully", data: todos });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
