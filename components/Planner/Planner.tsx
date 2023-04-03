import React, { useEffect, useState } from 'react';
import TaskList from '../TaskList/TaskList';
import { TaskType } from '../types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase';

interface PlannerProps {
  onListChange: (taskId: string, newList: TaskType['list']) => void;
  taskLists?: TaskType['list'][];
}

const defaultTaskLists: TaskType['list'][] = ['today', 'this week', 'this month', 'someday'];

const Planner: React.FC<PlannerProps> = ({ onListChange, taskLists = defaultTaskLists }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const tasksRef = collection(firestore, 'tasks');
      const q = query(tasksRef, where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData: TaskType[] = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ ...doc.data(), id: doc.id } as TaskType);
        });
        setTasks(tasksData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '1rem' }}>
      {taskLists.map((list) => (
        <div key={list} style={{ marginRight: '1rem', display: 'inline-block' }}>
          <h3>{list.charAt(0).toUpperCase() + list.slice(1)}</h3>
          <TaskList tasks={tasks} selectedList={list} onListChange={onListChange} hideControls />
        </div>
      ))}
    </div>
  );
};

export default Planner;
