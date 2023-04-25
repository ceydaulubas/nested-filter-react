import React from 'react';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Todo List</h1>
      <TodoList />
    </div>
  );
}

export default App;
