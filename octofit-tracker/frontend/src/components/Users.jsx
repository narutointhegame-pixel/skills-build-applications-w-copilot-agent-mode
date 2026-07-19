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

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://127.0.0.1:8000/api/users/';

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        setUsers(normalizePayload(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id ?? user._id ?? user.email} className="list-group-item">
            <strong>{user.name}</strong> — {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
