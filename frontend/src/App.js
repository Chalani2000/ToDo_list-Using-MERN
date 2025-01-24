import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // If backend fails, try loading from localStorage
      const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
      setTodos(savedTodos);
    }
  };

  // Add a new todo
  const addTodo = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', { text });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
      // Fallback to localStorage in case of backend error
      const newTodos = [...todos, { text, completed: false }];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  // Toggle todo completion status
  const toggleComplete = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <TodoForm onAddTodo={addTodo} onFilterChange={setFilter} />
      <TodoList 
        todos={filteredTodos} 
        onDeleteTodo={deleteTodo} 
        onToggleComplete={toggleComplete} 
      />
    </div>
  );
}

export default App;
