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
const SECRET_KEY = 'my_secret_key';

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

// запросы
// регистрация
app.post('/register', async (req, res) => {
    const {name, surname, password, email} = req.body;

    if (!name || !surname || !password || !email) {
        return res.status(400).json({message: 'Все поля должны быть заполнены'});
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const client = await pool.connect();

        try {
            const exitingUser = await client.query('SELECT user_id FROM users_table WHERE email = $1', [email]);

            if (exitingUser.rowCount > 0) {
                return res.status(409).json({message: 'Пользователь с таким адресом электронной почты уже зарегистрирован'})
            }

            const result = await client.query(
                'INSERT INTO users_table (name, surname, password, email) VALUES ($1, $2, $3, $4) RETURNING user_id',
                [name, surname, hashedPassword, email]
            );

            res.status(201).json({
                message: 'Пользователь успешно зарегистрирован',
                userId: result.rows[0].user_id,
            });

        } finally {
            client.release()
        }
    } catch (err) {
        console.error('Ошибка в регистрации пользователя:', err.message);
        res.status(500).json({message: 'Регистрация упала из-за ошибки на сервере'})
    }
});

// вход
app.post('/login', async (req, res) => {
    const {password, email} = req.body;

    if (!password || !email) {
        return res.status(400).json({message: 'Для входа требуется ввести пароль и почту'});
    };

    try {
        const result = await pool.query('SELECT * FROM users_table WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) {
                return res.status(401).json({message: 'Неверный логин или пароль'});
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({message: 'Неверный логин или пароль'});
        }

        const token = jwt.sign({
            userId: user.user_id,
            email: user.email
        }, SECRET_KEY);
        res.json({token, email});
    } catch (err) {
        console.error('Ошибка входа в аккаунт', err.message);
        res.status(500).json({message: 'Произошла другая ошибка'});
    };
});

