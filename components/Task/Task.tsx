import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material';

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
}

const Task: React.FC<TaskProps> = ({ task, onCompletionChange }) => {
  const handleCompletionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCompletionChange(task.id, event.target.checked);
  };

  return (
    <Card>
      <CardContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={task.completed}
              onChange={handleCompletionChange}
            />
          }
          label={<Typography variant="h6">{task.title}</Typography>}
        />
        <Typography>{task.description}</Typography>
        {task.dueDate && <Typography>Due: {task.dueDate}</Typography>}
        <Typography>Sizing: {task.sizing}</Typography>
        <Typography>Priority: {task.priority}</Typography>
        <Typography>Tags: {task.tags.join(', ')}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
