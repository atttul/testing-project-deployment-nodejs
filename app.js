// File: app.js
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './user_routes.js';
import { sequelize, testConnection } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
const PORT = +process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, async () => {
    await testConnection();
    await sequelize.sync();
    console.log(`Server running on port ${PORT}`);
});