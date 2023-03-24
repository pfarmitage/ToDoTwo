import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import Task from './components/Task/Task';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
  tags: string[];
  completed: boolean;
  list: 'today' | 'tomorrow' | 'next week' | 'next month' | 'someday';
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedList, setSelectedList] = useState<'today' | 'tomorrow' | 'next week' | 'next month' | 'someday'>('today');

  // Dummy task for testing
  const dummyTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    dueDate: '2023-03-30',
    sizing: 3,
    priority: 'normal',
    tags: ['test', 'demo'],
    completed: false,
    list: 'today',
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            To-Do List App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        {/* Task component with the dummy task */}
        <Task task={dummyTask} onCompletionChange={(taskId, completed) => {}} />
      </Container>
    </div>
  );
}

export default App;
