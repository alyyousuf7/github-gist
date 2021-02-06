import { useEffect, useState } from 'react';
import { GetGistForks, GetGistList } from '../services/gist-service';

function useGistSearch(pageSize) {
  const [username, setUsername] = useState();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState();
  const [gists, setGists] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [username, pageSize]);

  useEffect(() => {
    async function act() {
      if (!username) {
        return;
      }

      setPending(true);
      setError();
      try {
        const data = await GetGistList(username, pageSize, page);

        for (const row of data) {
          row.forks = await GetGistForks(row.id, 3);
        }

        setGists(data);
      } catch (err) {
        setError(err);
      } finally {
        setPending(false);
      }
    }

    act();
  }, [username, pageSize, page]);

  const loadGists = (u) => {
    setPage(1);
    setUsername(u);
  };
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page <= 1 ? 1 : page - 1);

  return {
    pending,
    error,
    gists,
    nextPage,
    prevPage,
    loadGists,
  };
}

export default useGistSearch;
