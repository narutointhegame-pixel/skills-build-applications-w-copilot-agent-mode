import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchCollection('activities');
        setActivities(data);
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
