import React from 'react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const TodoList = ({ todos, onDeleteTodo, onToggleComplete }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`todo ${todo.completed ? 'completed' : ''}`}
          >
            <li className="todo-item">{todo.text}</li>
            <button 
              className="complete-btn" 
              onClick={() => onToggleComplete(todo._id)}
            >
              <FaCheckCircle />
            </button>
            <button 
              className="trash-btn" 
              onClick={() => onDeleteTodo(todo._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
