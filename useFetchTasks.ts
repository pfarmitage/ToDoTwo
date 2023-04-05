import { useState, useEffect } from 'react';
import { TaskType } from './types';
import { collection, onSnapshot } from 'firebase/firestore';
import { db as firestore } from './firebase';

const useFetchTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Firestore instance:', firestore); // Add this line
    const taskCollection = collection(firestore, 'tasks');
    console.log('Tasks collection:', taskCollection); // Add this line

    const unsubscribe = onSnapshot(
      taskCollection,
      (querySnapshot) => {
        const fetchedTasks: TaskType[] = [];
        querySnapshot.forEach((doc) => {
          fetchedTasks.push({ ...doc.data(), id: doc.id } as TaskType);
        });
        setTasks(fetchedTasks);
        setLoading(false); 
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { tasks, setTasks, loading };
};

export default useFetchTasks;
