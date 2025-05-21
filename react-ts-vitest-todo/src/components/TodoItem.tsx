import type { Todo } from '../types/Todo';
import { useState } from 'react';
import { Checkbox, TextField, Box, IconButton } from '@mui/material';
import { Edit, Delete, Check, Close } from '@mui/icons-material';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, newText: string) => void; // Добавляем новый пропс
}

export function TodoItem({ todo, onToggle, onRemove, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(todo.text);
  };

  const handleSave = () => {
    if (editedText.trim() !== '') {
      onUpdate(todo.id, editedText); // Используем новую функцию
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '8px 16px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
    }}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        color="primary"
        sx={{ marginRight: 2 }}
      />
      
      {isEditing ? (
        <TextField
          fullWidth
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          variant="standard"
          sx={{ marginRight: 2 }}
        />
      ) : (
        <Box 
          sx={{ 
            flexGrow: 1,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'text.disabled' : 'text.primary',
            fontSize: '1.1rem'
          }}
          onClick={handleEdit} // Добавляем возможность редактирования по клику на текст
        >
          {todo.text}
        </Box>
      )}
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        {isEditing ? (
          <>
            <IconButton onClick={handleSave} size="small" color="primary">
              <Check fontSize="small" />
            </IconButton>
            <IconButton onClick={handleCancel} size="small" color="error">
              <Close fontSize="small" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEdit} size="small">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onRemove(todo.id)} size="small" color="error">
              <Delete fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
}