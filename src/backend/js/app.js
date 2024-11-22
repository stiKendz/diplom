// импорты
import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import http from 'http';
import pool from './db.js';

// код приложения
// запуск сервера
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send('Message from neptune');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// подключение бд к серверу
pool.connect((err) => {
    if (err) {
        console.error(`Error connecting to database: ${err.stack}`);
        return;
    }
    console.log('Connected to database');
});

