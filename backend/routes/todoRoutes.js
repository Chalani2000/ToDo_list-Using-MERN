const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Create Todo
router.post('/todos', todoController.createTodo);

// Get all Todos
router.get('/todos', todoController.getTodos);

// Toggle Todo completion status
router.put('/todos/:id', todoController.toggleComplete);

// Delete Todo
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
