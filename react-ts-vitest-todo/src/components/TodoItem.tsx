import type { Todo } from '../types/Todo';
import { useState } from 'react';
import { Button, Checkbox, TextField } from '@mui/material';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  return (
    <div>
      {isEditing ? (
        <TextField
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </span>
      )}
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <Button onClick={() => onRemove(todo.id)}>Remove</Button>
      {isEditing ? (
        <>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </>
      ) : (
        <Button onClick={handleEdit}>Edit</Button>
      )}
    </div>
  );
}