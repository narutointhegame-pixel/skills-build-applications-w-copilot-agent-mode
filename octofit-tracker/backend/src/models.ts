import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface ITeam {
  name: string;
  focus: string;
  members: number;
}

export interface IActivity {
  type: string;
  duration: number;
  calories: number;
  date: Date;
}

export interface ILeaderboardEntry {
  name: string;
  score: number;
  streak: number;
}

export interface IWorkout {
  title: string;
  difficulty: string;
  duration: number;
  goal: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  members: { type: Number, required: true },
});

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true, unique: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
  goal: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.models.Team || model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.models.Activity || model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.models.Workout || model<IWorkout>('Workout', workoutSchema);
