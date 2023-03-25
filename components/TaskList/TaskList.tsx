import React from 'react';
import { TaskType } from '../../App';
import Task from '../Task/Task';

interface TaskListProps {
  tasks: TaskType[];
  selectedList: 'today' | 'tomorrow' | 'next week' | 'next month' | 'someday';
  onCompletionChange: (taskId: string, isCompleted: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, selectedList, onCompletionChange }) => {
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
    <>
      {sortedTasks.map(task => (
        <Task key={task.id} task={task} onCompletionChange={onCompletionChange} />
      ))}
    </>
  );
};

export default TaskList;
