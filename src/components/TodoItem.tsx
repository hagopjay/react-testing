import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
      data-testid="todo-item"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        <span
          className={`text-lg ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onRemove(todo.id)}
        className="text-gray-500 hover:text-red-500 transition-colors"
        aria-label="Delete todo"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};