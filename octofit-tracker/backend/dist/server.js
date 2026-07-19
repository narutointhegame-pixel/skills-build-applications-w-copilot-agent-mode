"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        apiBaseUrl: getApiBaseUrl(),
    });
});
app.get('/api/users', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
app.post('/api/users', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
app.post('/api/teams', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(activities);
});
app.post('/api/activities', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).lean();
    res.json(leaderboard);
});
app.post('/api/leaderboard', async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
app.post('/api/workouts', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
        console.log('MongoDB connected');
    }
    catch (error) {
        console.warn('MongoDB unavailable, continuing without database connection.', error);
    }
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
};
startServer();
