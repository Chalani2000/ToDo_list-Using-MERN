import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const TodoForm = ({ onAddTodo, onFilterChange }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a todo"
      />
      <button type="submit" className="todo-button">
        <FaPlusCircle />
      </button>
      <div className="select">
        <select 
          className="filter-todo" 
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </form>
  );
};

export default TodoForm;
