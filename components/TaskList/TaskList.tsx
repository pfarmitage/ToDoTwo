import React from 'react';
import { List, ListItem } from '@mui/material';
import Task from '../Task/Task';
import { TaskType } from '../../types';


interface TaskListProps {
  tasks: TaskType[];
  onCompletionChange: (taskId: string, isCompleted: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompletionChange }) => {
  const sortedTasks = tasks.sort((taskA, taskB) => {
    const priorityOrder = ['urgent', 'high', 'normal'];

    const priorityDiff = priorityOrder.indexOf(taskA.priority) - priorityOrder.indexOf(taskB.priority);
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    const dueDateA = taskA.dueDate || '9999-12-31';
    const dueDateB = taskB.dueDate || '9999-12-31';

    return dueDateA.localeCompare(dueDateB);
  });

  return (
    <List>
      {sortedTasks.map(task => (
        <ListItem key={task.id}>
          <Task task={task} onCompletionChange={onCompletionChange} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
