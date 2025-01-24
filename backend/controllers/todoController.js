const Todo = require('../models/todoModel');

// Create a new Todo
const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: 'Error creating Todo', error: err });
  }
};

// Get all Todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching Todos', error: err });
  }
};

// Update Todo completion status
const toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Error updating Todo', error: err });
  }
};

// Delete a Todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting Todo', error: err });
  }
};

module.exports = { createTodo, getTodos, toggleComplete, deleteTodo };
