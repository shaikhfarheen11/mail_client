import { useState } from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url, options = {}, data = null) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: data ? JSON.stringify(data) : null,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            return await response.json();
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchData, isLoading, error };
};

export default useFetch;
