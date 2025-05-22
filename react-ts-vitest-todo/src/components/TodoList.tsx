import type { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { List } from '@mui/material';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
}

export function TodoList({ todos, onToggle, onRemove, onUpdate }: TodoListProps) {
  return (
    <List sx={{ padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </List>
  );
}