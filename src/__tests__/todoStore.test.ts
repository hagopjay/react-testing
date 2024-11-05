import { describe, it, expect, beforeEach } from 'vitest';
import { useTodoStore } from '../store/todoStore';

describe('todoStore', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [] });
  });

  it('adds a todo', () => {
    const store = useTodoStore.getState();
    store.addTodo('Test Todo');
    
    const todos = useTodoStore.getState().todos;
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe('Test Todo');
    expect(todos[0].completed).toBe(false);
  });

  it('toggles a todo', () => {
    const store = useTodoStore.getState();
    store.addTodo('Test Todo');
    const todoId = store.todos[0].id;
    
    store.toggleTodo(todoId);
    expect(store.todos[0].completed).toBe(true);
    
    store.toggleTodo(todoId);
    expect(store.todos[0].completed).toBe(false);
  });

  it('removes a todo', () => {
    const store = useTodoStore.getState();
    store.addTodo('Test Todo');
    const todoId = store.todos[0].id;
    
    store.removeTodo(todoId);
    expect(store.todos).toHaveLength(0);
  });

  it('clears completed todos', () => {
    const store = useTodoStore.getState();
    store.addTodo('Todo 1');
    store.addTodo('Todo 2');
    store.toggleTodo(store.todos[0].id);
    
    store.clearCompleted();
    expect(store.todos).toHaveLength(1);
    expect(store.todos[0].text).toBe('Todo 2');
  });
});