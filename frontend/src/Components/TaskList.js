import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
    return (
        <div className="task-lists">
            <div className="active-tasks">
                <h2>Active Tasks</h2>
                {tasks.filter(task => !task.completed).map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onToggle={onToggle} 
                        onDelete={onDelete} 
                        onEdit={onEdit} 
                    />
                ))}
            </div>
            <div className="completed-tasks">
                <h2>Completed Tasks</h2>
                {tasks.filter(task => task.completed).map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onToggle={onToggle} 
                        onDelete={onDelete} 
                        onEdit={onEdit} 
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
