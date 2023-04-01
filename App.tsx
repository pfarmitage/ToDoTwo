import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Container, AppBar, Toolbar, Typography, Box, Grid, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, Drawer, List, ListItem, ListItemText, CssBaseline, TextField} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import TaskForm from './components/TaskForm/TaskForm';
import Task from './components/Task/Task';
import TaskList from './components/TaskList/TaskList';
import Planner from './components/Planner/Planner';
import DateList from './components/DateList/DateList';
import SettingsDialog from './components/SettingsDialog/SettingsDialog';

import { TaskType } from './types';
import TaskFilterButton from './components/TaskFilterButton/TaskFilterButton';
import { ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import ProgressBar from './components/ProgressBar/ProgressBar';



function App() {
  //Authentication
  const { user, isAuthenticated } = useAuth();

  //Settings: Velocity
  const [velocity, setVelocity] = useState<number>(10);

  // SettingsDialog
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleSettingsDialogClose = () => {
    setSettingsDialogOpen(false);
  };

  const handleSettingsDialogSave = (newVelocity: number) => {
    setVelocity(newVelocity);
    setSettingsDialogOpen(false);
  };

  const scheduleDailyUpdate = () => {
    // Implement the function to schedule a daily update
  };

  /*useEffect(() => {
    scheduleDailyUpdate();
  }, []);
  */
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
  setIsCalendarVisible(!isCalendarVisible);
};

const [isDateListDialogOpen, setDateListDialogOpen] = useState(false);

const openDateListDialog = () => {
  setDateListDialogOpen(true);
};

const closeDateListDialog = () => {
  setDateListDialogOpen(false);
};

  // Dummy task for testing
  const dummyTask: TaskType = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    dueDate: '2023-03-30',
    sizing: 8,
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
    list: 'today',
  };
  
  const dummyTask3: TaskType = {
    id: '3',
    title: 'Test Task 3',
    description: 'This is a test task with urgent priority',
    dueDate: '2023-03-24',
    sizing: 3,
    priority: 'urgent',
    completed: false,
    list: 'someday',
  };

  const dummyTask4: TaskType = {
    id: '4',
    title: 'Future Task',
    description: 'This is a test task with normal priority',
    dueDate: '2024-03-24',
    sizing: 5,
    priority: 'normal',
    completed: false,
    list: 'this week',
  };

  const dummyTask5: TaskType = {
    id: '5',
    title: 'Past Task',
    description: 'This is a test task with normal priority',
    dueDate: '2022-03-24',
    sizing: 3,
    priority: 'normal',
    completed: false,
    list: 'this month',
  };

  //Set initial tasks state
  const [tasks, setTasks] = useState<TaskType[]>([dummyTask, dummyTask2, dummyTask3, dummyTask4, dummyTask5]);

  //Set initial selected List state
  const [selectedList, setSelectedList] = useState<'today' | 'this week' | 'this month' | 'someday' | 'completed' >('today');

  const [isTaskFormModalOpen, setIsTaskFormModalVisible] = useState<boolean>(false);

  //Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //Planner
  const [plannerTitle, setPlannerTitle] = useState('');

  const [visibleTaskLists, setVisibleTaskLists] = useState<TaskType['list'][]>(['today', 'this week', 'this month', 'someday']);

  const updateVisibleTaskLists = (newTaskLists: TaskType['list'][]) => {
    setVisibleTaskLists(newTaskLists);
  };

  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const openPlanner = (taskLists: TaskType['list'][]) => {
    setVisibleTaskLists(taskLists);
    setIsPlannerOpen(true);
  };
  
  const closePlanner = () => {
    setIsPlannerOpen(false);
  };

  const onListChange = (taskId: string, newList: TaskType['list']) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, list: newList };
        }
        return task;
      });
    });
  };

  //Task Add/Update Modal
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

  const toggleTaskFormVisibility = (reset: boolean = false) => {
    setIsTaskFormModalVisible((prevVisible) => !prevVisible);
    if (reset) {
      setEditedTask(null);
    }
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

  const getCompletedPoints = () => {
    return tasks
      .filter((task) => task.list === 'today' && task.completed)
      .reduce((total, currentTask) => total + currentTask.sizing, 0);
  };

//Dates and Completed Lists
const dummyDateData = [
  {
    id: 1,
    date: '2023-03-15',
    velocity: 100,
    totalPointsCompleted: 90,
    tasksCompleted: [
      { id: 1, title: 'Task 1', points: 40 },
      { id: 2, title: 'Task 2', points: 50 },
    ],
  },
  {
    id: 2,
    date: '2023-03-16',
    velocity: 120,
    totalPointsCompleted: 110,
    tasksCompleted: [
      { id: 3, title: 'Task 3', points: 60 },
      { id: 4, title: 'Task 4', points: 50 },
    ],
  },
  {
    id: 3,
    date: '2023-03-17',
    velocity: 80,
    totalPointsCompleted: 70,
    tasksCompleted: [
      { id: 5, title: 'Task 5', points: 30 },
      { id: 6, title: 'Task 6', points: 40 },
    ],
  },
  // Add more data as needed
];

const [dateData, setDateData] = useState(dummyDateData);

//Calculate the time until midnight
const getTimeUntilMidnight = () => {
const now = new Date();
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
return tomorrow.getTime() - now.getTime();
};

//Move completed tasks
const moveCompletedTasks = () => {
// 1. Filter out completed tasks
const completedTasks = tasks.filter(task => task.completed);

// 2. Create a Date record if necessary and get its id
const dateId = createOrUpdateDateRecord(completedTasks);

// 3. Assign the Date record id to the completed tasks
completedTasks.forEach(task => task.dateId = dateId);

// 4. Update the tasks state
setTasks([...tasks]);
};

//Find a date record if it does not already exist
const createOrUpdateDateRecord = (completedTasks) => {
// Your implementation here
};

useEffect(() => {
const timeUntilMidnight = getTimeUntilMidnight();
const timer = setTimeout(moveCompletedTasks, timeUntilMidnight);

return () => {
  clearTimeout(timer);
};
}, [tasks]);

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
    <AuthProvider>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
          <Switch>
            {currentUser ? (
              <Route path="/" exact>
                {/* Your existing main app code */}
              </Route>
            ) : (
              <>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Redirect to="/login" />
              </>
            )}
          </Switch>
        </Router>

          
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
              <ListItem
                button
                onClick={() => {
                  openDateListDialog();
                  toggleSidebar();
                }}
              >
                <ListItemText primary="Velocity" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  openPlanner(['today', 'this week']);
                  setPlannerTitle('Plan Today');
                  toggleSidebar();
                }}
              >
                <ListItemText primary="Plan Today" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  openPlanner(['today', 'this week', 'this month']);
                  setPlannerTitle('Plan This Week');
                  toggleSidebar();
                }}
              >
                <ListItemText primary="Plan This Week" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  openPlanner(['today', 'this week', 'this month', 'someday']);
                  setPlannerTitle('Plan This Month');
                  toggleSidebar();
                }}
              >
                <ListItemText primary="Plan All" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setSettingsDialogOpen(true);
                  toggleSidebar();
                }}
              >
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </Drawer>
          <Dialog open={isDateListDialogOpen} onClose={closeDateListDialog} fullWidth maxWidth="md">
            <DialogTitle>Velocity</DialogTitle>
            <DateList dateData={dateData} />
          </Dialog>
          <Dialog open={isPlannerOpen} onClose={closePlanner}>
            <DialogTitle>{plannerTitle}</DialogTitle>
            <IconButton
              style={{ position: 'absolute', top: 1, right: 5, zIndex: 1 }}
              edge="end"
              color="inherit"
              onClick={() => setIsPlannerOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Planner   taskLists={visibleTaskLists} tasks={tasks} onListChange={onListChange} title={plannerTitle}
            />
          </Dialog>
          <SettingsDialog
            open={settingsDialogOpen}
            onClose={handleSettingsDialogClose}
            onSave={handleSettingsDialogSave}
            initialVelocity={velocity}
          />
          <Container maxWidth="sm">
            
            <Box marginTop={2}>
            {isTaskFormModalOpen && (
              <Dialog open={isTaskFormModalOpen} onClose={toggleTaskFormVisibility} maxWidth="sm" fullWidth>
                <DialogTitle>
                  {editedTask ? 'Edit Task' : 'Add Task'}
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleModalClose}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <TaskForm   
                  key={editedTask ? editedTask.id : uuidv4()} 
                  onSubmit={handleTaskSubmit}
                  onCancel={handleModalClose}
                  initialTask={editedTask}/>
                </DialogContent>
              </Dialog>
              )}
              <IconButton onClick={() => toggleTaskFormVisibility(true)} color="primary">
                <AddIcon /> 
              </IconButton>
            </Box>
            <Box marginTop={2}>
              <ProgressBar totalPoints={getTotalPoints()} completedPoints={getCompletedPoints()} velocity={velocity} />
            </Box>
            <Stack marginTop={1} marginBottom={1}>
              <Grid container spacing={1}>
                {['today', 'this week', 'this month', 'someday'].map(
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
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
