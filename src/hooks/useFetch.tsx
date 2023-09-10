import { useState, useEffect } from 'react';

const useFetch = (url: string, options: RequestInit = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error };
};

export default useFetch;
