import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts');
        setWorkouts(data);
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
