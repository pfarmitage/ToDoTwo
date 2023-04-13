import React, { useEffect, useState } from 'react';
import { List, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';
import { TaskType } from '../../types';
import Task from '../Task/Task';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { db as firestore } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';


interface TaskListProps {
  tasks: TaskType[];
  selectedList: TaskType['list'];
  onCompletionChange: (taskId: string, completed: boolean) => void;
  onMoveTask: (taskId: string, newList: TaskType['list']) => void;
  onEditTask: (task: TaskType) => void;
  handleAddTask: (title: string) => void;
  onListChange: (taskId: string, newList: TaskType['list']) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; 
  hideControls?: boolean;
}

const updateTaskInFirestore = async (taskId: string, updateData: Partial<TaskType>) => {
  try {
    const taskRef = doc(firestore, 'tasks', taskId);
    await updateDoc(taskRef, updateData);
    console.log('Task updated in Firestore:', taskId, updateData);
  } catch (error) {
    console.error('Error updating task in Firestore:', taskId, updateData, error);
  }
};


const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedList,
  onCompletionChange,
  handleAddTask, 
  onEditTask,
  onListChange,
  hideControls = false,
}) => {
  const filteredTasks = tasks.filter((task) => task.list === selectedList);

  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      urgent: 3,
      high: 2,
      normal: 1,
    };

    if (a.priority !== b.priority) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    if (a.dueDate) {
      return -1;
    }

    if (b.dueDate) {
      return 1;
    }

    return 0;
  });

  const handleListChangeInternal = async (taskId: string, newList: TaskType['list']) => {
    await updateTaskInFirestore(taskId, { list: newList });
    //handleListChange(taskId, newList);
    onListChange(taskId, newList);
  };

  // New task title state
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleNewTaskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleNewTaskSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTaskTitle.trim()) {
      // Call the handleAddTask function passed as a prop
      handleAddTask(newTaskTitle.trim());
  
      // Clear the input field
      setNewTaskTitle('');
    }
  };

  return (
    <List>
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onCompletionChange={onCompletionChange}
          //handleListChange={handleListChangeInternal}
          onListChange={handleListChangeInternal}
          onEditTask={onEditTask}
          hideControls={hideControls}
        />
      ))}
      <TextField
        value={newTaskTitle}
        onChange={handleNewTaskTitleChange}
        onKeyDown={handleNewTaskSubmit}
        placeholder="What do you want to do?"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddCircleOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
    </List>
  );
};

export default TaskList;
