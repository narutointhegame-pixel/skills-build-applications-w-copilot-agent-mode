import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'admin' },
      { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
      { name: 'Mila Gomez', email: 'mila.gomez@example.com', role: 'coach' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Momentum', focus: 'Endurance', members: 8 },
      { name: 'Powerhouse', focus: 'Strength', members: 6 },
    ]);

    const activities = await Activity.insertMany([
      { type: 'run', duration: 35, calories: 410, date: new Date('2026-07-18') },
      { type: 'strength', duration: 50, calories: 320, date: new Date('2026-07-19') },
      { type: 'cycling', duration: 45, calories: 390, date: new Date('2026-07-19') },
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      { name: 'Ava Chen', score: 980, streak: 12 },
      { name: 'Noah Patel', score: 945, streak: 8 },
      { name: 'Mila Gomez', score: 910, streak: 10 },
    ]);

    const workouts = await Workout.insertMany([
      { title: 'HIIT Cardio Blast', difficulty: 'medium', duration: 25, goal: 'Improve cardio' },
      { title: 'Upper Body Strength', difficulty: 'hard', duration: 40, goal: 'Build strength' },
      { title: 'Core & Mobility Flow', difficulty: 'easy', duration: 20, goal: 'Recover and stretch' },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard entries:', leaderboardEntries.length);
    console.log('Seeded workouts:', workouts.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
