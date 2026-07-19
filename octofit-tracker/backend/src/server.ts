import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiBaseUrl: getApiBaseUrl(),
  });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.post('/api/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.post('/api/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json(leaderboard);
});

app.post('/api/leaderboard', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

app.post('/api/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB connected');
  } catch (error) {
    console.warn('MongoDB unavailable, continuing without database connection.', error);
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
};

startServer();
