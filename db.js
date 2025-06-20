// File: config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME || 'ebdb',
    process.env.DB_USER || 'admin',
    process.env.DB_PASSWORD || 'rootAtul',
    {
        host: process.env.DB_HOST || 'awseb-e-yv4dmpmwey-stack-awsebrdsdatabase-pkz32s7gpje6.cb8i606mw2k7.eu-north-1.rds.amazonaws.com',
        port: +process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
    }
);

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.👍', process?.env?.DB_USER);
    } catch (error) {
        console.error('Unable to connect to the database:', error, 'userName= ', process?.env?.DB_USER);
    }
};