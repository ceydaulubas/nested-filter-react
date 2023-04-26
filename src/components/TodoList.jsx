import React, { useState } from 'react';
import todoData from '../data/todo.json';
import Filter from './Filter';

const TodoList = () => {
    const [filteredTasks, setFilteredTasks] = useState(todoData.tasks);

    return (
        <div>
            <Filter tasks={todoData.tasks} setFilteredTasks={setFilteredTasks} />

            <div className="row">
                {filteredTasks.map((task) => (
                    <div className="col-sm-12 col-md-6 col-lg-4" key={task.id}>
                        <div className={`card mb-4 border-${task.priority}`}>
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-primary">{task.tag}</span>
                                    <span className={`badge bg-${task.priority}`}>{task.priority}</span>
                                </div>
                                <p className="card-text">
                                    <small className="text-muted">{`Due Date: ${task.dueDate}`}</small>
                                </p>
                                <p className="card-text">
                                    <small className={`badge bg-${task.status === 'Active' ? 'success' : 'danger'}`}>
                                        {task.status}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div></div>
    );
};

export default TodoList;
