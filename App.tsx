import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';
import { auth } from './firebase';
import { addDoc, collection, doc, getDocs, query, setDoc, where, updateDoc } from 'firebase/firestore';
import { db as firestore } from './firebase';
import useFetchTasks from './useFetchTasks';
import useFetchDates from './useFetchDates';

import { useAuth } from './AuthContext';
import { Container, AppBar, Toolbar, Typography, Box, Grid, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Drawer, List, ListItem, ListItemText, CssBaseline, TextField, Tabs, Tab} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import TaskForm from './components/TaskForm/TaskForm';
import Task from './components/Task/Task';
import TaskList from './components/TaskList/TaskList';
import Planner from './components/Planner/Planner';
import DateList from './components/DateList/DateList';
import SettingsDialog from './components/SettingsDialog/SettingsDialog';

import { TaskType } from './types';
import { ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import ProgressBar from './components/ProgressBar/ProgressBar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function App() {
  //Authentication
  const { user } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unregisterAuthObserver();
  }, []);

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
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={user ? <AppContent /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {

  //Set initial tasks state
  const { tasks, setTasks, loading } = useFetchTasks();

    //Set initial dates state
    const { dateData, setDateData, loadingDates, error } = useFetchDates();

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

  //Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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



  //const [tasks, setTasks] = useState<TaskType[]>([dummyTask, dummyTask2, dummyTask3, dummyTask4, dummyTask5]);

  //Set initial selected List state
  const [selectedList, setSelectedList] = useState<'today' | 'this week' | 'this month' | 'someday' | 'completed' >('today');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // Keep track of the selected tab index
  const taskLists = ['today', 'this week', 'this month', 'someday'];
  const currentSelectedList = taskLists[selectedTabIndex]; // Get the selected list using the selected tab index

  const [isTaskFormModalOpen, setIsTaskFormModalVisible] = useState<boolean>(false);

  //Dummy Dates
  //const [dateData, setDateData] = useState(dummyDateData);

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

  //Move tasks to completed list, and create a date record to complete the day
  const createOrUpdateDateRecord = async (completedTasks: TaskType[]) => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; 
    const userUid = auth.currentUser?.uid;
  
    if (userUid) {
      const dateCollection = collection(firestore, 'dates');
      const q = query(dateCollection, where('date', '==', dateStr), where('userId', '==', userUid));
      const querySnapshot = await getDocs(q);
  
      let dateId;
      if (querySnapshot.empty) {
        const newDateDoc = await addDoc(dateCollection, {
          date: dateStr,
          userId: userUid,
          velocity: velocity,
          actualVelocity: getCompletedPoints(),
          numberOfCompletedTasks: completedTasks.length,
        });
        dateId = newDateDoc.id;
      } else {
        const existingDateDoc = querySnapshot.docs[0];
        dateId = existingDateDoc.id;
        await setDoc(doc(dateCollection, dateId), {
          velocity: velocity,
          actualVelocity: getCompletedPoints(),
          numberOfCompletedTasks: completedTasks.length,
        }, { merge: true });
      }
      return dateId;
    }
  };
  

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateRecord, setDateRecord] = useState({ velocity: 0, actualPoints: 0, tasksCompleted: 0 });

  const handleCompleteDay = async () => {
    // Move completed tasks and create or update the date record
    const completedTasks = tasks.filter((task) => task.completed);
    const dateId = await createOrUpdateDateRecord(completedTasks);
    completedTasks.forEach((task) => (task.dateId = dateId));
  
    const updatedTasks = tasks.map((task) => {
      if (task.completed) {
        return { ...task, list: 'completed', dateId };
      }
      return task;
    });
  
    // Update tasks in Firebase
    updatedTasks.forEach(async (task) => {
      if (task.completed) {
        const taskDoc = doc(firestore, 'tasks', task.id);
        await updateDoc(taskDoc, {
          list: 'completed',
          dateId,
        });
      }
    });
  
    // Update the tasks state
    setTasks(updatedTasks);
  
    // Update the date record state
    const actualPoints = getCompletedPoints();
    const tasksCompleted = completedTasks.length;
    setDateRecord({ velocity, actualPoints, tasksCompleted });
  
    // Open the dialog
    setDialogOpen(true);
  };
  

  return (
    <div>
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
              Daily Sprint Planner
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
        <Dialog open={isDateListDialogOpen} onClose={closeDateListDialog} fullidth maxWidth="md">
          <DialogTitle>Velocity</DialogTitle>
          {loadingDates && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {!loadingDates && !error && <DateList dateData={dateData} />}
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
              <Typography>
              Add Task
              </Typography>
            </IconButton>
            <IconButton onClick={() => {
                openPlanner(['today', 'this week']);
                setPlannerTitle('Plan Today');
              }} color="primary">
              <PlaylistAddIcon /> 
              <Typography>
              Plan Today
              </Typography>
            </IconButton>
            <IconButton onClick={handleCompleteDay} color="primary">
              <CheckCircleOutlineIcon /> 
              <Typography>
              Complete Day
              </Typography>
            </IconButton>
          </Box>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Date Record</DialogTitle>
            <DialogContent>
              <DialogContentText>Velocity: {dateRecord.velocity}</DialogContentText>
              <DialogContentText>Actual Points Completed: {dateRecord.actualPoints}</DialogContentText>
              <DialogContentText>Number of Tasks Completed: {dateRecord.tasksCompleted}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
          <Box marginTop={2}>
            <ProgressBar totalPoints={getTotalPoints()} completedPoints={getCompletedPoints()} velocity={velocity} />
          </Box>
          <Stack marginTop={1} marginBottom={1}>
          <Grid container spacing={1}>
            <Tabs
                value={selectedTabIndex}
                onChange={(event, newValue) => {
                  setSelectedTabIndex(newValue);
                  setSelectedList(taskLists[newValue]);
                }}
                fullwidth="true"
                centered
              >
                {['today', 'this week', 'this month', 'someday'].map((list, index) => (
                  <Tab key={list} label={list} value={index} />
                ))}
              </Tabs>
            </Grid>
          </Stack>
        <Box marginTop={1}>
          {!loading ? (
            <TaskList
              tasks={tasks}
              selectedList={selectedList}
              onCompletionChange={handleCompletionChange}
              onListChange={handleListChange}
              onEditTask={handleEditTask}
              handleListChange={handleListChange}
              totalPoints={getTotalPoints(tasks)}
              velocity={velocity}
            />
          ) : (
            <Typography variant="h6" component="div">
              Loading tasks...
            </Typography>
          )}
        </Box>
        

        </Container>
      </div>
  );
}

export default App;
