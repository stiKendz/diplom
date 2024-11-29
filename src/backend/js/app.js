// импорты
import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import http from 'http';
import pool from './db.js';
import multer from 'multer';
import fileUpload from 'express-fileupload';

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
            // втавка данных в таблицу users_table
            const exitingUser = await client.query('SELECT user_id FROM users_table WHERE email = $1', [email]);
            if (exitingUser.rowCount > 0) {
                return res.status(409).json({message: 'Пользователь с таким адресом электронной почты уже зарегистрирован'})
            }

            const result = await client.query(
                'INSERT INTO users_table (name, surname, password, email) VALUES ($1, $2, $3, $4) RETURNING user_id',
                [name, surname, hashedPassword, email]
            ); // возращает user_id

            // вcтака данных в таблицу roles_table, где role_name имеет default 'user'
            const userId = result.rows[0].user_id;
            if (email === 'admin@yandex.ru') {
                const role_name = 'admin';
                await client.query(
                    'INSERT INTO roles_table (role_name, user_id) VALUES ($1, $2)',
                    [role_name, userId]
                );
            } else {
                await client.query(
                    'INSERT INTO roles_table (user_id) VALUES ($1)',
                    [userId]
                );
            };

            // завершение транзацкии
            await client.query(
                'COMMIT'
            );

            res.status(201).json({
                message: 'Пользователь успешно зарегистрирован',
                userId: result.rows[0].user_id,
            });
        // обработка ошибки вставки данных, и отмена транзакции
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
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
        const user = result.rows[0]; // !!! записть в переменную user результата поиска по бд который лежит в result
        if (!user) {
                return res.status(401).json({message: 'Неверный логин или пароль'});
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({message: 'Неверный логин или пароль'});
        }

        const roleSearch = await pool.query('SELECT * FROM roles_table WHERE user_id = $1', [user.user_id]);
        const role = roleSearch.rows[0] ? roleSearch.rows[0].role_name : 'user'; 
        // если role_name присутствует -(всегда присутствует, просто когда email проходит проверку из /register на админа, то я добавляю role_name,
        // если не проходит, то не добавляю, роль в виде user сама генерируется на уровне бд тк default у role_name = 'user')-
        // в roles_table следовательно role_name = 'admin', если нет то 'user';

        const token = jwt.sign({
            userId: user.user_id,
            email: user.email,
            role: role
        }, SECRET_KEY);
        res.json({token, email, role});
        
    } catch (err) {
        console.error('Ошибка входа в аккаунт', err.message);
        res.status(500).json({message: 'Произошла ошибка на сервере'});
    };
});

// добавление двигателя (на странице администратор: admin-page.html) 
app.post('/addengine', async (req, res) => {
    const {
        engine_serial_name, 
        engine_size, 
        engine_type,
        engine_nano,
        engine_horse_power,
        engine_expenditure_city,
        engine_expenditure_track,
        camshaft_system
    } = req.body;

    const engineParams = {
        engine_serial_name, 
        engine_size, 
        engine_type,
        engine_nano,
        engine_horse_power,
        engine_expenditure_city,
        engine_expenditure_track,
        camshaft_system
    }

    for(let key in engineParams) {
        if (!engineParams[key]) {
            return res.status(400).json({message: 'Все поля должны быть заполнены'});
        }
    }

    // if (!engine_serial_name || !engine_size || !engine_type || !engine_nano || !engine_horse_power || !engine_expenditure_city || !engine_expenditure_track || !camshaft_system) {
    //     return res.status(400).json({message: 'Все поля должны быть заполнены'});
    // }   

    try {
        const client = await pool.connect();

        try {
            const exitingEngine = await client.query('SELECT * FROM engine_table WHERE engine_serial_name = $1',[engine_serial_name]);
            if (exitingEngine.rowCount > 0) {
                return res.status(409).json({message: 'Двигатель с таким названием уже присутствует в базе данных'});
            };
            

            const result = await client.query(
                'INSERT INTO engine_table (engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING engine_id',
                [engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system]
            );
            const engineId = result.rows[0].engine_id;

            res.status(201).json({
                message: 'Двигатель успешно добавлен',
                engineId: engineId
            });
        } catch (err) {
            console.error(`Произошла в запросе при добавлении двигателя: ${err.message}`);
            res.status(500).json({message: 'ошибка при добавлении двигателя из-за ошибки в зопросе'})
        };
    } catch (err) {
        console.error(`Произошла ошибка при добавлении двигателя: ${err.message}`);
        res.status(500).json({message: 'Произошла ошибка при добавлении двигателя из-за ошибки на сервере'})
    };
});

// вывод всех двигателей (на странице администратора)
app.get('/getengines', async (req, res) => {
    try {
        const client = await pool.connect();

        try {
            const response = await client.query(
                'SELECT * FROM engine_table'
            )

            const result = response.rows;
    
            res.json({
                message: 'все двигатели',
                allEngines: result
            })
        } catch (err) {
            console.log(`Ошибка вывода всех пользователей ${err.message}`);
            res.status(500).json({message: 'Ошибка вывода всех пользователей на стороне запроса'});
        }
    } catch (err) {
        console.log(`Ошибка вывода всех пользователей ${err.message}`);
        res.status(500).json({message: 'Ошибка вывода всех пользователей на стороне сервера'});
    };
});


// загрузка фотографии
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/uploadimage', upload.single('image'), async (req, res) => {
    try {
        const image = req.file.buffer; // получение изображения из буфера multer
        const {carId, carModelName} = req.body;
        
        if (!carId || !carModelName || !image) {
            // return res.status(400).json({message: 'все поля должны быть заполены'})
            console.log('одно из полей не заполнено')
        };

        const result = await pool.query(
            'INSERT INTO images_table (car_id, src, for_car_name) VALUES ($1, $2, $3) RETURNING image_id, car_id', 
            [carId, image, carModelName]
        ); 
        // добавить пояснялку на страницу, что нужен НОМЕР модели в поле ввода названия модели-- w204, gc8, ek2, b240
        
        if(result.rows.length === 0) {
            // return res.status(400).json({message: 'Изображение не было загружено'});
            console.log('в result ничего нет')
        };

        const uploadIds = {
            imageId: result.rows[0].image_id,
            whatCarId: result.rows[0].car_id
        };

        console.log('Изображение успешно загружено');
    } catch (err){
        console.error('Ошибка загрузки изображения', err.message);
    };
});
