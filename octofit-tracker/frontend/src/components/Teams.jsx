import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchCollection('teams');
        setTeams(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team.id ?? team._id ?? team.name} className="list-group-item">
            <strong>{team.name}</strong> — {team.focus} ({team.members} members)
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
