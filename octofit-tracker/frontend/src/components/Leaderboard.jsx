import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await fetchCollection('leaderboard');
        setEntries(data);
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
