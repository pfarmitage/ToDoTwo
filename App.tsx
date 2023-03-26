import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Grid, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './components/TaskForm/TaskForm';
import Task from './components/Task/Task';
import TaskList from './components/TaskList/TaskList';
import { TaskType } from './types';
import TaskFilterButton from './components/TaskFilterButton/TaskFilterButton';
import { ThemeProvider, createTheme } from '@mui/material';



function App() {
  //Set Velocity
  const [velocity, setVelocity] = useState<number>(10);

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
  const [selectedList, setSelectedList] = useState<'today' | 'tomorrow' | 'next week' | 'next month' | 'someday' | 'completed' >('today');
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);

  

  const handleTaskSubmit = (taskData: TaskType) => {
    setTasks([...tasks, taskData]);
    setIsTaskFormVisible(false);
  };

  const handleCompletionChange = (taskId: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: isCompleted } : task,
      ),
    );
  };

  const toggleTaskFormVisibility = () => {
    setIsTaskFormVisible(prevVisible => !prevVisible);
  };

  const handleCancelForm = () => {
    setIsTaskFormVisible(false);
  };

  const handleListChange = (taskId: string, newList: TaskType['list']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, list: newList } : task)),
    );
  };

  //Calculate the cumulative total points of tasks in the 'today' list
  const getTotalPoints = () => {
    return tasks
      .filter((task) => task.list === 'today')
      .reduce((total, currentTask) => total + currentTask.sizing, 0);
  };

  const theme = createTheme({
    palette: {
      text: {
        primary: '#000000',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.completed': {
              color: 'gray',
            },
            '&.title.completed': {
              textDecoration: 'line-through',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
            {isTaskFormVisible ? (
              <TaskForm onSubmit={handleTaskSubmit} onCancel={handleCancelForm} />
            ) : (
              <IconButton onClick={toggleTaskFormVisibility} color="primary">
                <AddIcon />
              </IconButton>
            )}
          </Box>
          <Box marginTop={2}>
            <Typography>Total points for today: {getTotalPoints()}</Typography>
            <Typography>Velocity: {velocity}</Typography>
          </Box>
          <Stack marginTop={1} marginBottom={1}>
            <Grid container spacing={1}>
              {['today', 'tomorrow', 'next week', 'next month', 'someday', 'completed'].map(
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
          </Stack>
        <Box marginTop={4}>
          <TaskList tasks={tasks} selectedList={selectedList} onCompletionChange={handleCompletionChange} onListChange={handleListChange} totalPoints={getTotalPoints(tasks)} velocity={velocity}/>
        </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
