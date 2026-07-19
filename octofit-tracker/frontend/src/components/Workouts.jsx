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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://127.0.0.1:8000/api/workouts/';

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        setWorkouts(normalizePayload(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout.id ?? workout._id ?? workout.title} className="list-group-item">
            <strong>{workout.title}</strong> — {workout.difficulty} ({workout.goal})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
