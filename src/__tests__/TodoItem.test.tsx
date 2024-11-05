import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoItem } from '../components/TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test Todo',
    completed: false,
    createdAt: new Date(),
  };

  it('renders todo text correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onRemove={() => {}}
      />
    );
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('calls onToggle when toggle button is clicked', () => {
    const onToggle = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={onToggle}
        onRemove={() => {}}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Mark as complete'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onRemove when delete button is clicked', () => {
    const onRemove = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onRemove={onRemove}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Delete todo'));
    expect(onRemove).toHaveBeenCalledWith('1');
  });

  it('shows completed styling when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={() => {}}
        onRemove={() => {}}
      />
    );
    
    expect(screen.getByText('Test Todo')).toHaveClass('line-through');
  });
});