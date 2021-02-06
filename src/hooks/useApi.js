import { useEffect, useState } from 'react';

function useApi(fn) {
  if (typeof fn !== 'function') {
    throw new Error('fn must be a function');
  }

  const [pending, setPending] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    let isActive = true;

    async function act() {
      try {
        setPending(true);
        setError();
        setResponse();

        const resp = await fn();
        if (isActive) {
          setResponse(resp);
        }
      } catch (err) {
        if (isActive) {
          setError(err);
        }
      } finally {
        if (isActive) {
          setPending(false);
        }
      }
    }

    act();

    return () => {
      isActive = false;
    }
  }, [fn]);

  return { pending, error, response };
}

export default useApi;
