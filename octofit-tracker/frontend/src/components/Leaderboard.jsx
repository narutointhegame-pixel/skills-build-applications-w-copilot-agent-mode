import { useEffect, useState } from 'react';

const normalizePayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records;
  }

  return [];
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://127.0.0.1:8000/api/leaderboard/';

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        setEntries(normalizePayload(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    loadEntries();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry.id ?? entry._id ?? entry.name} className="list-group-item d-flex justify-content-between">
            <span>{entry.name}</span>
            <strong>{entry.score}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Leaderboard;
