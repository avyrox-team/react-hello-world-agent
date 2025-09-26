import { useState, useEffect } from 'react';
import type { Todo } from '../types';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputText.trim() === '') return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputText.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const remainingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-card">
      <h2>📝 Todo List</h2>
      
      <div className="todo-input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-todo-button">
          Add
        </button>
      </div>

      {todos.length > 0 && (
        <div className="todo-counter">
          {remainingCount} of {todos.length} remaining
        </div>
      )}

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <label className="todo-checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="checkmark"></span>
            </label>
            <span className="todo-text">{todo.text}</span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="delete-todo-button"
              title="Delete todo"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <div className="empty-state">
          No todos yet. Add one above to get started!
        </div>
      )}
    </div>
  );
};

export default TodoList;