import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiHint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/...`
    : 'http://127.0.0.1:8000/api/...';

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6">OctoFit Tracker</h1>
        <p className="text-muted">
          Multi-tier fitness dashboard. Configure VITE_CODESPACE_NAME in .env.local for Codespaces URLs.
          <br />
          API fallback: {apiHint}
        </p>
      </header>

      <nav className="nav nav-pills mb-4">
        <NavLink className="nav-link" to="/users">Users</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
        <NavLink className="nav-link" to="/activities">Activities</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>

      <footer className="mt-4">
        <Link to="/users">View users</Link>
      </footer>
    </div>
  );
}

export default App
