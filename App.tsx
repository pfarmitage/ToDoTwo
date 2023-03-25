import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm/TaskForm';
import Task from './components/Task/Task';
import TaskList from './components/TaskList/TaskList';
import { TaskType } from './types';
import TaskFilterButton from './components/TaskFilterButton/TaskFilterButton';



function App() {
  // Dummy task for testing
  const dummyTask: TaskType = {
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
  const dummyTask2: TaskType = {
    id: '2',
    title: 'Test Task 2',
    description: 'This is a test task with high priority',
    dueDate: '2023-03-25',
    sizing: 5,
    priority: 'high',
    tags: ['test', 'demo'],
    completed: false,
    list: 'next week',
  };
  
  const dummyTask3: TaskType = {
    id: '3',
    title: 'Test Task 3',
    description: 'This is a test task with urgent priority',
    dueDate: '2023-03-24',
    sizing: 1,
    priority: 'urgent',
    tags: ['test', 'demo'],
    completed: false,
    list: 'tomorrow',
  };

  const [tasks, setTasks] = useState<TaskType[]>([dummyTask, dummyTask2, dummyTask3]);
  const [selectedList, setSelectedList] = useState<'today' | 'tomorrow' | 'next week' | 'next month' | 'someday'>('today');

  

  const handleTaskSubmit = (taskData: TaskType) => {
    setTasks([...tasks, taskData]);
  };

  const handleCompletionChange = (taskId: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: isCompleted } : task,
      ),
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            To Do
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box marginTop={2}>
          <TaskForm onSubmit={handleTaskSubmit} />
        </Box>
        <Box marginTop={4} marginBottom={2}>
          <Grid container spacing={2}>
            {['today', 'tomorrow', 'next week', 'next month', 'someday'].map(
              (list) => (
                <Grid item key={list}>
                  <TaskFilterButton
                    label={list}
                    selected={selectedList === list}
                    onSelect={(label) => setSelectedList(label as any)}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </Box>
        <Box marginTop={4}>
          <TaskList tasks={tasks} selectedList={selectedList} onCompletionChange={handleCompletionChange} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
