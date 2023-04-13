import { useState, useEffect } from 'react';
import { TaskType } from './types';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db as firestore } from '../utils/firebase';

const useFetchTasks = (userId: string) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const taskCollection = collection(firestore, 'tasks');
        const q = query(taskCollection, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
  
        const fetchedTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setTasks(fetchedTasks);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [userId]);
  
  return { tasks, setTasks, loading, error };

};

export default useFetchTasks;
