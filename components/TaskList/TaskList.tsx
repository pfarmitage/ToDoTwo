import React, { useEffect, useState } from 'react';
import { List,} from '@mui/material';
import { TaskType } from '../../types';
import Task from '../Task/Task';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { db as firestore } from '../../firebase';

interface TaskListProps {
  tasks: TaskType[];
  selectedList: TaskType['list'];
  onCompletionChange: (taskId: string, completed: boolean) => void;
  //handleListChange: (taskId: string, newList: TaskType['list']) => void;
  onEditTask: (task: TaskType) => void;
  totalPoints: number;
  velocity: number;
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
  //handleListChange, 
  onEditTask,
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
  };

  return (
    <List>
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onCompletionChange={onCompletionChange}
          onListChange={handleListChangeInternal}
          onEditTask={onEditTask}
          hideControls={hideControls}
        />
      ))}
    </List>
  );
};

export default TaskList;
