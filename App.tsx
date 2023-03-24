import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm/TaskForm';
import Task from './components/Task/Task';

// Define the Task interface
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

  const handleTaskSubmit = (taskData: Task) => {
    setTasks([...tasks, taskData]);
  };

  const handleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
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
        <Box marginTop={2}>
          <TaskForm onSubmit={handleTaskSubmit} />
        </Box>
        <Box marginTop={4}>
          {tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onTaskCompletion={handleTaskCompletion}
            />
          ))}
          {/* Task component with the dummy task */}
          <Task task={dummyTask} onCompletionChange={(taskId, completed) => {}} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
