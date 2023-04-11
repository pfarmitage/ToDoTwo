import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  ListItem,
  Typography,
} from '@mui/material';
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

const Task = ({ task, onCompletionChange, onEditTask = () => {}, hideControls = false }) => {
  const handleCompletionChange = (event) => {
    onCompletionChange(task.id, event.target.checked);
  };

  const handleEditButtonClick = (event) => {
    event.stopPropagation();
    onEditTask(task);
  };

  return (
    <ListItem>
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
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            {!hideControls && (
              <Checkbox
                checked={task.completed}
                onChange={handleCompletionChange}
                sx={{ marginRight: 1 }}
              />
            )}
          </Grid>
          <Grid item xs>
          {task.priority == 'normal' && (
            <IconButton
              size="small"
              title="Priority: Normal"
            >            
              <RemoveIcon fontSize="small" />
            </IconButton>
          )}
          {task.priority == 'high' && (
            <IconButton
              size="small"
              title="Proiority: High"
            >            
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
          )}
          {task.priority == 'urgent' && (
            <IconButton
              size="small"
              title="Priority: Urgent"
            >            
              <KeyboardDoubleArrowUpIcon fontSize="small" />
            </IconButton>
          )}
            <Typography
              className={task.completed ? 'completed title' : ''}
              onClick={handleEditButtonClick}
              style={{ cursor: 'pointer' }}
              title="Click to View/Edit"
              variant="body1"
              component="span"
              noWrap
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
