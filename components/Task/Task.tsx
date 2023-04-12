import React, { useState } from 'react';
import {Box,Checkbox,FormControlLabel,Grid,IconButton,ListItem,Typography,Menu,MenuItem,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import HelpIcon from '@mui/icons-material/Help';
import CircleIcon from '@mui/icons-material/Circle';
import Flag from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


interface TaskProps {
  task: TaskType;
  onCompletionChange: (taskId: string, completed: boolean) => void;
  onListChange: (taskId: string, newList: Task['list']) => void;
  handleListChange: (taskId: string, newList: Task['list']) => void;
  onEditTask: (task: TaskType) => void;
  totalPoints: number;
  velocity: number;
  hideControls?: boolean;
}

const Task = ({ task, onCompletionChange, onListChange, onEditTask  = () => {}, hideControls = false }) => {
  const handleCompletionChange = (event) => {
    onCompletionChange(task.id, event.target.checked);
  };

  const handleEditButtonClick = (event) => {
    event.stopPropagation();
    onEditTask(task);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveTask = async (newList: TaskType['list']) => {
    // Call the function passed down as a prop to update the task in Firestore and the state
    onListChange(task.id, newList);
  
    // Close the menu
    handleClose();
  };
  

  return (
    <ListItem
      sx={{
        padding: '6px 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background-color 0.3s',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
        }}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            {!hideControls && (
              <Checkbox
                checked={task.completed}
                onChange={handleCompletionChange}
              />
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={handleClick}>
              <ArrowRightIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
            {task.list !== 'today' && (
            <IconButton
              size="small"
              title="Today"
              onClick={() => { onListChange(task.id, 'today'); handleClose(); }}
              >
              <CircleIcon fontSize="small" />
            </IconButton>
            )}
            {task.list !== 'this week' && (
              <MenuItem
                size="small"
                title="This Week"
                onClick={() => { onListChange(task.id, 'this week'); handleClose(); }}
                >
                <ArrowCircleRightIcon fontSize="small" />
              </MenuItem>
            )}
            {task.list !== 'this month' && (
              <MenuItem
                size="small"
                title="This Month"
                onClick={() => { onListChange(task.id, 'this month'); handleClose(); }}
                >
                <NextPlanIcon fontSize="small" />
              </MenuItem>
            )}
            {task.list !== 'someday' && (
              <MenuItem
                size="small"
                title="Someday"
                onClick={() => { onListChange(task.id, 'someday'); handleClose(); }}
                >
                <HelpIcon fontSize="small" />
              </MenuItem>
            )}
            </Menu>
          </Grid>
          <Grid item>
            {task.priority === 'normal' && (
              <IconButton
                size="small"
                title="Priority: Normal"
              >            
                <RemoveIcon fontSize="small" />
              </IconButton>
            )}
            {task.priority === 'high' && (
              <IconButton
                size="small"
                title="Proiority: High"
              >            
                <KeyboardArrowUpIcon fontSize="small" />
              </IconButton>
            )}
            {task.priority === 'urgent' && (
              <IconButton
                size="small"
                title="Priority: Urgent"
              >            
                <KeyboardDoubleArrowUpIcon fontSize="small" />
              </IconButton>
            )}
          </Grid>
          <Grid item>
            <Typography
              style={{cursor:'pointer'}}
              title="Missing Description and Date"
              onClick={handleEditButtonClick}
            >
              {(!task.dueDate && !task.description) && (
                <>
                  <Flag fontSize="small" color="error" />
                </>
              )}
            </Typography>
            <Typography
              style={{cursor:'pointer'}}
              title="Missing Description"
              onClick={handleEditButtonClick}
            >
              {(!task.description && task.dueDate) && (
                <>
                  <Flag fontSize="small" color="warning" />
                </>
              )}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              className={task.completed ? 'completed title' : ''}
              onClick={handleEditButtonClick}
              style={{ cursor: 'pointer' }}
              title="Click to View/Edit"
              variant="body1"
              component="span"
              sx={{
                wordWrap: 'break-word',
                whiteSpace: 'pre-line',
              }}
            >
              {task.title} ({task.sizing})
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ListItem>
  );
};

export default Task;
