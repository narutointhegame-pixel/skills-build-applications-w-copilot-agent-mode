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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://127.0.0.1:8000/api/teams/';

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        setTeams(normalizePayload(payload));
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
