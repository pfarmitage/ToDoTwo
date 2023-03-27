import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Button, Box, Stack,   IconButton, Accordion, AccordionSummary, AccordionDetails,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EastIcon from '@mui/icons-material/East';
import StartIcon from '@mui/icons-material/Start';
import HelpIcon from '@mui/icons-material/Help';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';


interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
  completed: boolean;
  list: 'today' | 'tomorrow' | 'next week' | 'next month' | 'someday';
  isNewTask?: boolean;
}

interface TaskProps {
  task: Task;
  onCompletionChange: (taskId: string, completed: boolean) => void;
  onListChange: (taskId: string, newList: Task['list']) => void;
  onEditTask: (task: Task) => void;
  totalPoints: number;
  velocity: number;
}

const Task: React.FC<TaskProps> = ({ task, onCompletionChange, onListChange, onEditTask, totalPoints, velocity }) => {
  const handleCompletionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCompletionChange(task.id, event.target.checked);
  };

  const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEditTask(task);
  };

  return (
    <Card>
      <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={task.completed}
                  onChange={handleCompletionChange}
                />
              }
              label={<Typography
                className={task.completed ? 'completed title' : ''}
              >
                {task.title}
              </Typography>}
              />
              <IconButton
                onClick={handleEditButtonClick}
                size="small"
                sx={{ marginLeft: 1 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            
            <Box className="move-icons-wrapper">
            <Stack direction="row" spacing={1} sx={{ marginTop: 1 }} >
              {task.list !== 'today' && (
                <IconButton
                  size="small"
                  title="Today"
                  onClick={() => onListChange(task.id, 'today')}
                >
                  <FiberManualRecordIcon fontSize="small" />
                </IconButton>
              )}
              {task.list !== 'tomorrow' && (
                <IconButton
                  size="small"
                  title="Tomorrow"
                  onClick={() => onListChange(task.id, 'tomorrow')}
                >
                  <KeyboardArrowRightIcon fontSize="small" />
                </IconButton>
              )}
              {task.list !== 'next week' && (
                <IconButton
                  size="small"
                  title="Next Week"
                  onClick={() => onListChange(task.id, 'next week')}
                >
                  <EastIcon fontSize="small" />
                </IconButton>
              )}
              {task.list !== 'next month' && (
                <IconButton
                  size="small"
                  title="Next Month"
                  onClick={() => onListChange(task.id, 'next month')}
                >
                  <StartIcon fontSize="small" />
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
            </Box>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className={task.completed ? 'completed' : ''}>
              {task.description}
            </Typography>
            {task.dueDate && (
              <Typography className={task.completed ? 'completed' : ''}>
                Due: {task.dueDate}
              </Typography>
            )}
            <Typography className={task.completed ? 'completed' : ''}>
              Sizing: {task.sizing}
            </Typography>
            <Typography className={task.completed ? 'completed' : ''}>
              Priority: {task.priority}
            </Typography>
          </AccordionDetails>
        </Accordion>
    </Card>
  );
};

export default Task;
