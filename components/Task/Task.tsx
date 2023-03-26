import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Button, Box, Stack,   IconButton, Accordion, AccordionSummary, AccordionDetails,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EastIcon from '@mui/icons-material/East';
import StartIcon from '@mui/icons-material/Start';
import HelpIcon from '@mui/icons-material/Help';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
  tags: string[];
  completed: boolean;
  list: 'today' | 'tomorrow' | 'next week' | 'next month' | 'someday';
}

interface TaskProps {
  task: Task;
  onCompletionChange: (taskId: string, completed: boolean) => void;
  onListChange: (taskId: string, newList: Task['list']) => void; // Updated the type here
}

const Task: React.FC<TaskProps> = ({ task, onCompletionChange, onListChange }) => {
  const handleCompletionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCompletionChange(task.id, event.target.checked);
  };

  return (
    <Card>
      <CardContent>
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
                variant="h6"
                className={task.completed ? 'completed title' : ''}
              >
                {task.title}
              </Typography>}
            />
            <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
              <IconButton
                size="small"
                title="Today"
                onClick={() => onListChange(task.id, 'today')}
              >
                <FiberManualRecordIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                title="Tomorrow"
                onClick={() => onListChange(task.id, 'tomorrow')}
              >
                <KeyboardArrowRightIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                title="Next Week"
                onClick={() => onListChange(task.id, 'next week')}
              >
                <EastIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                title="Next Month"
                onClick={() => onListChange(task.id, 'next month')}
              >
                <StartIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                title="Someday"
                onClick={() => onListChange(task.id, 'someday')}
              >
                <HelpIcon fontSize="small" />
              </IconButton>
            </Stack>
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
            <Typography className={task.completed ? 'completed' : ''}>
              Tags: {task.tags.join(', ')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Task;
