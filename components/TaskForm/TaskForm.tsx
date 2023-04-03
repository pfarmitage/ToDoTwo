import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../../types';
import Task from '../Task/Task';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { auth } from '../../firebase';


interface FormData {
  title: string;
  description: string;
  dueDate: string | '';
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
}

interface TaskFormProps {
  onSubmit: (taskData: Task) => void;
  onCancel: () => void;
  onResetForm: () => void;
  initialTask?: Task;
}

const addTaskToFirestore = async (task: TaskType) => {
  try {
    const taskRef = doc(db, 'tasks', task.id);
    await setDoc(taskRef, task);
    console.log('Task added to Firestore');
  } catch (error) {
    console.error('Error adding task to Firestore:', error);
  }
};

const updateTaskInFirestore = async (task: TaskType) => {
  try {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, task);
    console.log('Task updated in Firestore');
  } catch (error) {
    console.error('Error updating task in Firestore:', error);
  }
};

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, onResetForm, initialTask }) => {

  const { handleSubmit, control, reset, setValue } = useForm<FormData>({
    defaultValues: initialTask
      ? {
          title: initialTask.title,
          description: initialTask.description,
          dueDate: initialTask.dueDate,
          sizing: initialTask.sizing,
          priority: initialTask.priority,
        }
      : {
          title: '',
          description: '',
          dueDate: null,
          sizing: 1,
          priority: 'normal',
        },
  });

  useEffect(() => {
    if (initialTask) {
      reset({
        title: initialTask.title,
        description: initialTask.description,
        dueDate: initialTask.dueDate,
        sizing: initialTask.sizing,
        priority: initialTask.priority,
      });
    } else {
      reset({
        title: '',
        description: '',
        dueDate: null,
        sizing: 1,
        priority: 'normal',
      });
    }
  }, [initialTask, reset, onResetForm]);
  
  const handleFormSubmit = (data: FormData) => {
    const taskData: TaskType = {
      ...(initialTask || { id: uuidv4() }),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      sizing: data.sizing,
      priority: data.priority,
      completed: initialTask?.completed || false,
      list: initialTask?.list || 'today',
      isNewTask: !initialTask,
      userId: auth.currentUser.uid, 
    };
    
    if (!initialTask) {
      addTaskToFirestore(taskData);
    } else {
      updateTaskInFirestore(taskData);
    }
    
    onSubmit(taskData);
    
  
    reset();
  };

  const handleResetForm = () => {
    reset({
      title: '',
      description: '',
      dueDate: '',
      sizing: 1,
      priority: 'normal',
    });
  };

  return (
     <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Title" variant="outlined" fullWidth required />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Description" variant="outlined" fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dueDate"
            control={control}
            defaultValue=""
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
            defaultValue={1}
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
            defaultValue="normal"
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
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              {initialTask ? 'Update' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;