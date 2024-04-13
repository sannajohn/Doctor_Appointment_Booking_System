import { useEffect, useState } from 'react';
import { token } from '../config';
// Consider using a secure method to access the token (e.g., environment variables)
//import {token} from '../../../backend/auth/verifyToken.js'

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }, // Replace with secure token retrieval
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message );
        }

        setData(result.data); // Assuming data is nested within "data" property
        setLoading(false);

      } catch(err) {
        setLoading(false); // Ensure loading state is updated even on errors
        setError(err.message);
      }
    };

    fetchData();
  }, [url]); // Adjust dependency array

  return { data, loading, error };
};

export default useFetchData;
