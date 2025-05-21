import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoList } from './components/TodoList';
import { TextField, Box, Typography, Paper, CssBaseline } from '@mui/material';

function App() {
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodos();
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTodoText.trim() !== '') {
      addTodo(newTodoText);
      setNewTodoText('');
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: 4
    }}>
      <CssBaseline />
      
      <Box sx={{ 
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center',
            padding: 3,
            fontWeight: 300,
            color: 'rgba(0, 0, 0, 0.6)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          What needs to be done?
        </Typography>
        
        <Paper elevation={0}>
          <Box sx={{ paddingX: 2 }}>
            <TextField
              fullWidth
              placeholder="Add new todo..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={handleAddTodo}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  '& fieldset': { border: 'none' },
                  paddingY: 2
                }
              }}
            />
          </Box>
          
          <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
          
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            color: 'text.secondary'
          }}>
            <Typography variant="body2">
              {activeTodosCount} items left
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ cursor: 'pointer' }}>All</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer' }}>Active</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer' }}>Completed</Typography>
            </Box>
            <Typography 
              variant="body2" 
              onClick={clearCompleted}
              sx={{ cursor: 'pointer' }}
            >
              Clear completed
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default App;