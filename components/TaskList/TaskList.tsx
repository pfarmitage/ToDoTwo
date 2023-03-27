import React from 'react';
import { TaskType } from '../../types';
import Task from '../Task/Task';

interface TaskListProps {
  tasks: TaskType[];
  selectedList: TaskType['list'];
  onCompletionChange: (taskId: string, completed: boolean) => void;
  onListChange: (taskId: string, newList: TaskType['list']) => void;
  onEditTask: (task: TaskType) => void;
  totalPoints: number;
  velocity: number;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, selectedList, onCompletionChange, onListChange, onEditTask }) => {
  const filteredTasks = tasks.filter(task => task.list === selectedList);

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

  return (
    <div>
      {sortedTasks.map(task => (
        <Task key={task.id} task={task} onCompletionChange={onCompletionChange} onListChange={onListChange} onEditTask={onEditTask} />
      ))}
    </div>
  );
};

export default TaskList;
