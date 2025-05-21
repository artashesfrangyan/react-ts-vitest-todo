import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoList } from './components/TodoList';
import { TextField, Box, Typography, Paper, CssBaseline, Button, ButtonGroup } from '@mui/material';

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted, updateTodoText } = useTodos();
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const handleAddTodo = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTodoText.trim() !== '') {
      addTodo(newTodoText);
      setNewTodoText('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

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
          
          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleTodo} 
            onRemove={removeTodo}
            onUpdate={updateTodoText}
          />
          
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
            <ButtonGroup
              variant="text" 
              size="small"
              sx={{
                '& .MuiButton-root': {
                  border: 'none',
                  borderRadius: '14px',

                  '&:not(:last-child)': {
                    marginRight: '8px'
                  }
                }
              }}
            >
              <Button 
                onClick={() => setFilter('all')}
                sx={{
                  backgroundColor: filter === 'all' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                All
              </Button>
              <Button 
                onClick={() => setFilter('active')}
                sx={{
                  backgroundColor: filter === 'active' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Active
              </Button>
              <Button 
                onClick={() => setFilter('completed')}
                sx={{
                  backgroundColor: filter === 'completed' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Completed
              </Button>
            </ButtonGroup>
            
            <Button 
              onClick={clearCompleted}
              variant="text"
              size="small"
              disabled={!todos.some(todo => todo.completed)}
            >
              Clear completed
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default App;