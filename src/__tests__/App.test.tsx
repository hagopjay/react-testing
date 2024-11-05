import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { useTodoStore } from '../store/todoStore';

describe('App Integration', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [] });
  });

  it('adds and displays a new todo', () => {
    render(<App />);
    
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.submit(input);
    
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('toggles todo completion status', () => {
    render(<App />);
    
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);
    
    const toggleButton = screen.getByLabelText('Mark as complete');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Test Todo')).toHaveClass('line-through');
  });

  it('removes a todo', () => {
    render(<App />);
    
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);
    
    const deleteButton = screen.getByLabelText('Delete todo');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });

  it('clears completed todos', () => {
    render(<App />);
    
    // Add and complete a todo
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);
    
    const toggleButton = screen.getByLabelText('Mark as complete');
    fireEvent.click(toggleButton);
    
    // Clear completed
    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);
    
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });
});