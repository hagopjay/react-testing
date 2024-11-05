import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoInput } from '../components/TodoInput';

describe('TodoInput', () => {
  it('calls onAdd with trimmed input when form is submitted', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);
    
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: '  New Todo  ' } });
    fireEvent.submit(input);
    
    expect(onAdd).toHaveBeenCalledWith('New Todo');
  });

  it('clears input after submission', () => {
    render(<TodoInput onAdd={() => {}} />);
    
    const input = screen.getByTestId('todo-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.submit(input);
    
    expect(input.value).toBe('');
  });

  it('does not call onAdd when input is empty', () => {
    const onAdd = vi.fn();
    render(<TodoInput onAdd={onAdd} />);
    
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input);
    
    expect(onAdd).not.toHaveBeenCalled();
  });
});