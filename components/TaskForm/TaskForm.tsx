import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

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

interface FormData {
  title: string;
  description: string;
  dueDate: string | null;
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
  tags: string;
}

interface TaskFormProps {
  onSubmit: (taskData: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const [tags, setTags] = useState(initialValues?.tags.join(', ') || '');
  const { handleSubmit, control, reset } = useForm<FormData>();

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };
  
  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      id: uuidv4(),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      sizing: data.sizing,
      priority: data.priority,
      tags: data.tags.split(',').map(tag => tag.trim()),
      completed: false,
      list: 'today',
    });

    reset();
  };

  return (
     <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Title" variant="outlined" fullWidth required />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Description" variant="outlined" fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Due Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="sizing"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Sizing" variant="outlined" fullWidth required>
                {[1, 2, 3, 5, 8, 13, 21].map(value => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Priority" variant="outlined" fullWidth required>
                {['normal', 'high', 'urgent'].map(value => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="tags"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Tags (comma-separated)"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;