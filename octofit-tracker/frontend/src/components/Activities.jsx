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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://127.0.0.1:8000/api/activities/';

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        setActivities(normalizePayload(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity.id ?? activity._id ?? activity.type} className="list-group-item">
            <strong>{activity.type}</strong> — {activity.duration} min, {activity.calories} cal
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
