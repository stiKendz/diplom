import express, { json } from 'express';
import pg from 'pg';
import { hash, compare } from 'bcrypt';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

// Загружаем переменные окружения из .env файла
config();

const app = express();
const PORT = process.env.PORT || 5000;

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    database: 'testdb',
    password: '12345',
    host: 'localhost',
    port: 5432
});

pool.connect((err) => {
    if (err) {
        console.error(`Error connecting to database: ${err.stack}`);
        return;
    } 
    console.log('Connected to database');
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Позволяет парсить JSON запросы

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Хэшируем пароль с помощью bcrypt
    const hashedPassword = await hash(password, 10);

    try {
        const client = await pool.connect();

        if (!username || !email || !password) {
            return res.status(400).json({message: 'Все поля должны быть заполнены'});
        };

        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );

        res.status(201).json({ 
            message: 'Пользователь успешно зарегистрирован',
            userId: result.rows[0].id 
        });

    } catch (error) {
        console.error('Ошибка в регистрации пользователя' + error);
        res.status(500).send('Ошибка при регистрации');
    }
});

// Вход пользователя
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        // Проверка пароля
        if (user && await compare(password, user.password)) {
            return res.status(200).json({ message: 'Вход успешен!', userId: user.id });
        } else {
            return res.status(401).json({ message: 'Неверные имя пользователя или пароль'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при входе');
    }
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});