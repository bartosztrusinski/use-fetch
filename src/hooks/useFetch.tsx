import { useEffect, useState } from 'react';

export function useFetch<D>(url: RequestInfo | URL, options?: RequestInit) {
  const [data, setData] = useState<D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        const data: D = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setData(null);
        setError(
          error instanceof Error
            ? error
            : new Error('An error occurred while fetching the data')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return { data, isLoading, error };
}
