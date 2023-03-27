import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Grid, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, Drawer, List, ListItem, ListItemText, CssBaseline, } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './components/TaskForm/TaskForm';
import Task from './components/Task/Task';
import TaskList from './components/TaskList/TaskList';
import { TaskType } from './types';
import TaskFilterButton from './components/TaskFilterButton/TaskFilterButton';
import { ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


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
    completed: false,
    list: 'tomorrow',
  };

  const [tasks, setTasks] = useState<TaskType[]>([dummyTask, dummyTask2, dummyTask3]);
  const [selectedList, setSelectedList] = useState<'today' | 'tomorrow' | 'next week' | 'next month' | 'someday' | 'completed' >('today');

  const [isTaskFormModalOpen, setIsTaskFormModalVisible] = useState<boolean>(false);

  //Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTaskSubmit = (taskData: TaskType) => {
    if (!taskData.isNewTask) {
      // Update existing task
      const updatedTasks = tasks.map((task) => (task.id === taskData.id ? taskData : task));
      setTasks(updatedTasks);
    } else {
      // Create new task
      setTasks([...tasks, taskData]);
    }
    setEditedTask(null);
    toggleTaskFormVisibility();
  };

  const handleModalClose = () => {
    setEditedTask(null);
    toggleTaskFormVisibility();
  };

  const handleEditTask = (task: TaskType) => {
    setEditedTask(task);
    toggleTaskFormVisibility();
  };

  const handleCompletionChange = (taskId: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: isCompleted } : task,
      ),
    );
  };

  const toggleTaskFormVisibility = () => {
    setIsTaskFormModalVisible(prevVisible => !prevVisible);
  };

  const handleListChange = (taskId: string, newList: TaskType['list']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, list: newList } : task)),
    );
  };

  const [editedTask, setEditedTask] = useState<TaskType | null>(null);

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

  const ProgressBar: React.FC<{ totalPoints: number; velocity: number }> = ({ totalPoints, velocity }) => {
    const percentage = Math.min((totalPoints / velocity) * 100, 100);
  
    return (
      <>
        <Typography>Task Capacity for Today</Typography>
          <Box border={1} borderColor="grey.500" borderRadius={5} width="100%" height={20}>
            <Box
              bgcolor="primary.main"
              borderRadius={5}
              width={`${percentage}%`}
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
            <Typography color="white" fontWeight="bold">
              {totalPoints} / {velocity}
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
              To Do
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={toggleSidebar}
        >
          <List>
            {['today', 'tomorrow', 'next week', 'next month', 'someday'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container maxWidth="sm">
          
          <Box marginTop={2}>
          {isTaskFormModalOpen && (
            <Dialog open={isTaskFormModalOpen} onClose={toggleTaskFormVisibility} maxWidth="sm" fullWidth>
              <DialogTitle>{editedTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
              <DialogContent>
                <TaskForm onSubmit={handleTaskSubmit} initialTask={editedTask} />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleTaskFormVisibility} color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            )}
            <IconButton onClick={toggleTaskFormVisibility} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
          <Box marginTop={2}>
            <ProgressBar totalPoints={getTotalPoints()} velocity={velocity} />
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
        <Box marginTop={1}>
          <TaskList
            tasks={tasks}
            selectedList={selectedList}
            onCompletionChange={handleCompletionChange}
            onListChange={handleListChange}
            onEditTask={handleEditTask}
            totalPoints={getTotalPoints(tasks)}
            velocity={velocity}
          />
        </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
