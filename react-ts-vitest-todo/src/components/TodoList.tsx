import type { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { List } from '@mui/material';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  return (
    <List sx={{ padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </List>
  );
}