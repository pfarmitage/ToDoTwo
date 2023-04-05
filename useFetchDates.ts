import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db as firestore } from './firebase';

const useFetchDates = (userId: string) => {
  const [dateData, setDateData] = useState<any[]>([]);
  const [loadingDates, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true);
      setError(null);
      try {
        const dateCollection = collection(firestore, 'dates');
        const q = query(dateCollection, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const fetchedDates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDateData(fetchedDates);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDates();
    } else {
      setDateData([]);
      setLoading(false);
    }
  }, [userId]);

  return { dateData, setDateData, loadingDates, error };
};

export default useFetchDates;
