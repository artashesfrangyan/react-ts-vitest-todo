import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';
import { describe, expect, it } from 'vitest';

describe('useTodos hook', () => {
  it('should add todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('New todo');
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('New todo');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should toggle todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('New todo');
    });
    
    const addedTodo = result.current.todos[0];
    expect(addedTodo.completed).toBe(false);

    act(() => {
      result.current.toggleTodo(addedTodo.id);
    });
    
    expect(result.current.todos[0].completed).toBe(true);
  });

  it('should remove todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('New todo');
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.removeTodo(todoId);
    });
    
    expect(result.current.todos).toHaveLength(0);
  });

  it('should update todo text', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('New todo');
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.updateTodoText(todoId, 'Updated text');
    });
    
    expect(result.current.todos[0].text).toBe('Updated text');
  });
});