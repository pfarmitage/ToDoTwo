import React from 'react';
import TaskList from '../TaskList/TaskList';
import { TaskType } from '../types';

interface PlannerProps {
  tasks: TaskType[];
  onListChange: (taskId: string, newList: TaskType['list']) => void;
  taskLists?: TaskType['list'][];
}

const defaultTaskLists: TaskType['list'][] = ['today', 'this week', 'this month', 'someday'];

const Planner: React.FC<PlannerProps> = ({ tasks, onListChange, taskLists = defaultTaskLists }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '1rem'  }}>
      {taskLists.map((list) => (
        <div key={list} style={{ marginRight: '1rem',display: 'inline-block' }}>
          <h3>{list.charAt(0).toUpperCase() + list.slice(1)}</h3>
          <TaskList tasks={tasks} selectedList={list} onListChange={onListChange} hideControls/>
        </div>
      ))}
    </div>
  );
};

export default Planner;
