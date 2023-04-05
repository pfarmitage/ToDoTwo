import React, { useState } from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Button, Box, Stack,   IconButton, Accordion, AccordionSummary, AccordionDetails,} from '@mui/material';
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
import { TaskType } from '../types';
import RefineTask from '../RefineTask/RefineTask';

interface TaskProps {
  task: TaskType;
  onCompletionChange: (taskId: string, completed: boolean) => void;
  onListChange: (taskId: string, newList: Task['list']) => void;
  onEditTask: (task: TaskType) => void;
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

  const [isRefineTaskOpen, setIsRefineTaskOpen] = useState(false);

  const handleRefineTaskSave = (conversation) => {
    // Update the task with the refined description.
    // Close the RefineTask component.
    setIsRefineTaskOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row">  
        {!hideControls && (
          <Checkbox
          checked={task.completed}
          onChange={handleCompletionChange}
          sx={{ marginRight: 1 }}
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
          <Button onClick={() => setIsRefineTaskOpen(true)}>Help Refine Task</Button>
            <RefineTask
              task={task}
              isOpen={isRefineTaskOpen}
              onClose={() => setIsRefineTaskOpen(false)}
              onSave={handleRefineTaskSave}
            />
        </Stack>     
      </CardContent>
    </Card>
  );
};

export default Task;
