import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db as firestore } from './firebase';

const useFetchDates = (userId: string) => {
  const [dateData, setDateData] = useState<any[]>([]);
  const [loadingDates, setLoading] = useState(true);

  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true);
      const dateCollection = collection(firestore, 'dates');
      const q = query(dateCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const fetchedDates = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDateData(fetchedDates);
      setLoading(false);
    };

    if (userId) {
      fetchDates();
    } else {
      setDateData([]);
      setLoading(false);
    }
  }, [userId]);

  return { dateData, setDateData, loadingDates };
};

export default useFetchDates;
