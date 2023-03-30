import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Button, Box, Stack,   IconButton, Accordion, AccordionSummary, AccordionDetails,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import HelpIcon from '@mui/icons-material/Help';
import CircleIcon from '@mui/icons-material/Circle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
  completed: boolean;
  list: 'today' | 'this week' | 'this month' | 'someday';
  isNewTask?: boolean;
}

interface TaskProps {
  task: Task;
  onCompletionChange: (taskId: string, completed: boolean) => void;
  onListChange: (taskId: string, newList: Task['list']) => void;
  onEditTask: (task: Task) => void;
  totalPoints: number;
  velocity: number;
  hideControls?: boolean;
}

const Task: React.FC<TaskProps> = ({ task, onCompletionChange, onListChange, onEditTask = () => {}, totalPoints, velocity,   hideControls = false,
}) => {
  const handleCompletionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCompletionChange(task.id, event.target.checked);
  };

  const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEditTask(task);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row">  
        {!hideControls && (
          <FormControlLabel
            control={
              <Checkbox
                checked={task.completed}
                onChange={handleCompletionChange}
              />
            }
            label={}
            />
          )}
          <Typography
              className={task.completed ? 'completed title' : ''}
              onClick={handleEditButtonClick}
              style={{cursor:'pointer'}}
              title="Click to View/Edit"
            >
              {task.title}
              {!hideControls && (
                <IconButton
                  size="small"
                >            
                <EditIcon fontSize="small" />
                </IconButton>
              )}
          </Typography>  
        </Stack>
        <Stack direction="row" spacing={1} sx={{ margin: 0 }} >
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
              className={task.completed ? 'completed' : ''}
              title="Sizing"
            >
              {task.sizing}
          </Typography>  
          {task.list !== 'today' && (
            <IconButton
              size="small"
              title="Today"
              onClick={() => onListChange(task.id, 'today')}
            >
              <CircleIcon fontSize="small" />
            </IconButton>
          )}
          {task.list !== 'this week' && (
            <IconButton
              size="small"
              title="This Week"
              onClick={() => onListChange(task.id, 'this week')}
            >
              <ArrowCircleRightIcon fontSize="small" />
            </IconButton>
          )}
          {task.list !== 'this month' && (
            <IconButton
              size="small"
              title="This Month"
              onClick={() => onListChange(task.id, 'this month')}
            >
              <NextPlanIcon fontSize="small" />
            </IconButton>
          )}
          {task.list !== 'someday' && (
            <IconButton
              size="small"
              title="Someday"
              onClick={() => onListChange(task.id, 'someday')}
            >
              <HelpIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>     
      </CardContent>
    </Card>
  );
};

export default Task;
