// импорты
import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import http from 'http';
import adminPool from './db.js';
import multer from 'multer';
import fileUpload from 'express-fileupload';
import { error } from 'console';
import pg from 'pg';
import fs from 'fs';
import { connect } from 'http2';
import { type } from 'os';

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

    createDatabase();
});

// скрипт для создания базы данных, таблиц в ней и подключение её к серверу
const { Pool } = pg;
let pool = null;

app.post('/createdb', async (req, res) => {
    const adminClient = await adminPool.connect();

    try {
        try {
            await adminClient.query(`CREATE DATABASE car_help`);
        } catch (err) {
            if (err.code !== '42P04') throw err;
        }


        pool = new Pool({ ...adminPool.options, database: 'car_help', password: '12345'});
        const client = await pool.connect();

        const createTables = fs.readFileSync('./src/scripts/server/createDbtables.sql', 'utf-8');
        await client.query(createTables);

        res.status(200).send('База данных инициализорована');
    } catch (err) {
        res.status(500).send(`Ошибка ${err.message}`);
    } finally {
        adminClient.release();
    }
});

const createDatabase = async () => {
    try {
        const response = await fetch('http://localhost:3000/createdb', {
            method: 'POST'
        })
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Произошла ошибка: ' + error)
    }
}


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

            const correctEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if(!correctEmailRegex.test(email)) {
                return res.status(401).json({message: 'Адрес элетронной почты должен содержать @ и . , иметь корректное имя почтового домена'})
            }

            const result = await client.query(
                'INSERT INTO users_table (name, surname, password, email) VALUES ($1, $2, $3, $4) RETURNING user_id',
                [name, surname, hashedPassword, email]
            ); // возращает user_id

            // вcтака данных в таблицу roles_table, где role_name имеет default 'user'
            const userId = result.rows[0].user_id;
            if (email === 'toguedriver@gmail.com') {
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
            return res.status(400).json({emptyInputsMessage: 'Все поля должны быть заполнены'});
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
                return res.status(409).json({duplicateEngineMessage: 'Двигатель с таким названием уже присутствует в базе данных'});
            };
            

            const result = await client.query(
                'INSERT INTO engine_table (engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING engine_id',
                [engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system]
            );
            const engineId = result.rows[0].engine_id;

            res.status(201).json({
                successAddEngine: 'Двигатель успешно добавлен',
                engineId: engineId
            });
        } catch (err) {
            console.error(`Произошла в запросе при добавлении двигателя: ${err.message}`);
            res.status(500).json({message: 'ошибка при добавлении двигателя из-за ошибки в зопросе'})
        } finally {
            client.release();
        }
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
                allEngines: result
            })
        } catch (err) {
            console.log(`Ошибка вывода всех двигателей ${err.message}`);
            res.status(500).json({message: 'Ошибка вывода всех двигателей на стороне запроса'});
        } finally {
            client.release();
        }
    } catch (err) {
        console.log(`Ошибка вывода всех двигателей ${err.message}`);
        res.status(500).json({message: 'Ошибка вывода всех двигателей на стороне сервера'});
    };
});

// добавление автомобиля
app.post('/addcar', async (req, res) => {
    const {
        concern,
        brand,
        model_name,
        generation,
        model_number,
        release_date,
        end_release_date,
        engine_id,
        gearbox,
        car_vehicle,
        body_type,
        price_start,
        price_end
    } = req.body;

    const carParams = {
        concern,
        brand,
        model_name,
        generation,
        model_number,
        release_date,
        end_release_date,
        engine_id,
        gearbox,
        car_vehicle,
        body_type,
        price_start,
        price_end
    }

    for (let key in carParams) {
        if (!carParams[key]) {
            return res.status(400).json({emptyInputsMessage: 'Все поля должны быть заполнены'})
        };
    };

    try {
        const client = await pool.connect();

        try {
            const exitingCar = await client.query(
                'SELECT * FROM cars_table WHERE model_number = $1', [model_number]
            )
            if(exitingCar.rowCount > 0) {
                return res.status(409).json({message: 'Автомобиль с таким названием модели уже присутствует в базе данных'});
            }

            // проверка на ноль в таблице engine_table
            const engineCount = await client.query(
                'SELECT * FROM engine_table where engine_id = $1', [engine_id]
            )
            if(engineCount.rowCount < 1) {
                return res.status(400).json({noEngineInDb:`В базе данных нет двигателя с таким id: ${engine_id}`})
            }

            const response = await client.query(
                'INSERT INTO cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, gearbox, car_vehicle, body_type, price_start, price_end) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING car_id, engine_id',
                [concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, gearbox, car_vehicle, body_type, price_start, price_end]
            )
            const carId = response.rows[0].car_id;
            const engineId = response.rows[0].engine_id;

            res.status(201).json({
                successAddCar: 'Автомбиль успешно добавлен',
                carId: carId,
                engineId: engineId
            });
        } catch(err) {
            console.error(`Ошибка добавления автомобиля ${err.message}`);
            res.status(500).json({message:'Ошибка добавления автомобиля из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Ошибка добавления автомобиля ${err.message}`);
        res.status(500).json({message:'Ошибка добавления автомобиля из-за ошибки на сервере'});
    };
});

// вывод всех автомобилей (на странице администратора)
app.get('/getcars', async (req, res) => {
    try {
        const client = await pool.connect();

        try {
            const response = await client.query(
                'SELECT * FROM cars_table',
            )

            const result = response.rows;

            res.status(201).json({
                allCars: result
            });
        } catch (err) {
            console.error(`Ошибка вывода автомобилей из-за ошибки в запросе : ${err.message}`);
            res.status(400).json({message: 'Ошибка вывода всех автомобилей из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка вывода автомобилей :${err.message}`);
        res.status(500).json({message: 'Ошибка вывода всех автомобилей из-за ошибки на сервере'});
    };
});

// добавление проблемы (на странице администратора)
app.post('/addproblem', async (req, res) => {
    const {
        problem_name,
        problem_short_description,
        difficult,
        how_to_fixed,
        problem_price
    } = req.body;

    const problemParts = {
        problem_name,
        problem_short_description,
        difficult,
        how_to_fixed,
        problem_price
    };

    for(let key in problemParts) {
        if(!problemParts[key]) {
            return res.status(400).json({emptyInputsMessage: 'Все поля должны быть заполнены'});
        };
    };

    try {
        const client = await pool.connect();

        try {
            const exitingProblem = await client.query(
                'SELECT * FROM problems_table WHERE problem_name = $1',
                [problem_name]
            )
            if (exitingProblem.rowCount > 0) {
                return res.status(409).json({duplicateProblemMessage: 'В базе данных уже имеется проблема с таким названием'});
            };

            const result = await client.query(
                'INSERT INTO problems_table (problem_name, problem_short_description, difficult, how_to_fixed, problem_price) VALUES ($1, $2, $3, $4, $5) RETURNING problem_id, problem_name',
                [problem_name, problem_short_description, difficult, how_to_fixed, problem_price]
            );
            const problemId = result.rows[0].problem_id;
            const problemName = result.rows[0].problem_name;

            res.status(201).json({
                successAddProblem: 'Проблема успешно добавлена',
                problemId: problemId,
                problemName: problemName,
            });
        } catch(err) {
            console.error(`Произошла ошибка при добавлении проблемы: ${err.message}`);
            res.status(500).json({message: 'Произошла ошибка при добавлении проблемы из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Произошла ошибка при добавлении проблемы: ${err.message}`);
        res.status(500).json({message: 'Произошла ошибка при добавлении проблемы из-за ошибки на сервере'});
    };
});

// вывод всех проблем (на странице администратора)
app.get('/getproblems', async (req, res) => {
    try {
        const client = await pool.connect();

        try {
            const response = await client.query(
                'SELECT * FROM problems_table'
            )

            const result = response.rows;
            
            res.status(201).json({
                message: 'Все проблемы',
                allProblems: result
            });
        } catch(err) {
            console.error(`Ошибка при выводе всех проблем из-за ошибки в запросе: ${err.message}`);
            res.status(500).json({message: 'Ошибка при выводе всех проблем из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Ошибка при выводе всех проблем из-за ошибки на сервере: ${err.message}`);
        res.status(500).json({message: 'Ошибка при выводе всех проблем из-за ошибки на сервере'});
    };
});

// добавление проблемы автомобилю (на странице администратора)
app.post('/addproblemtocar', async (req, res) => {
    const {car_id, problem_id} = req.body;

    if (!car_id || !problem_id) {
        return res.status(400).json({emptyInputsMessage: 'Все поля должны быть заполнены'})
    }

    try {
        const client = await pool.connect();

        try {
            const carRequire = await client.query(
                'SELECT * FROM cars_table WHERE car_id = $1', [car_id]
            )
            if (carRequire.rowCount < 1) {
                return res.status(409).json({noCarInDb: `В базе данных не существует автомобиля с таким id: ${car_id}`});
            }

            const problemRequire = await client.query(
                'SELECT * FROM problems_table where problem_id = $1', [problem_id]
            )
            if (problemRequire.rowCount < 1) {
                return res.status(409).json({noProblemInDb: `В базе данных не существует проблемы с таким id: ${problem_id}`});
            }

            // проверка на совпадения составного первичного ключа
            const primaryKeyRequire = await client.query(
                'SELECT * FROM car_problems_table WHERE car_id = $1 AND problem_id = $2',
                [car_id, problem_id]
            )
            if (primaryKeyRequire.rowCount > 0) {
                return res.status(409).json({dublicateProblem: `Проблема с id - ${problem_id} уже добавлена автомобилю с id - ${car_id}`})
            }

            const result = await client.query(
                'INSERT INTO car_problems_table (car_id, problem_id) VALUES ($1, $2) RETURNING car_id, problem_id',
                [car_id, problem_id]
            )
            const carId = result.rows[0].car_id;
            const problemId = result.rows[0].problem_id;

            res.status(201).json({
                successAddProblem: 'Проблемы и автомобили',
                carId: carId,
                problemId: problemId
            });
        } catch(err) {
            console.error(`Ошибка при добавлении проблемы автомобилю из-за ошибки в запросе: ${err.message}`);
            res.status(500).json({message: 'Ошибка при добавлении проблемы автомобилю из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Ошибка при добавлении проблемы автомобилю из-за ошибки на сервере: ${err.message}`);
        res.status(500).json({message: 'Ошибка при добавлении проблемы автомобилю из-за ошибки на сервере'});
    }
});

// просмотр всех проблем у автомобилей (на странице администратора)
app.get('/getcarproblems', async (req, res) => {
    try {
        const clien = await pool.connect();

        try {
            const response = await clien.query(
                `SELECT ct.car_id, ct.brand, ct.model_name, ct.generation, pt.problem_id, pt.problem_name 
                FROM cars_table AS ct 
                INNER JOIN car_problems_table AS cpt ON ct.car_id = cpt.car_id
                INNER JOIN problems_table AS pt ON cpt.problem_id = pt.problem_id
                ORDER BY ct.car_id;
                `
            )
            const result = response.rows;

            res.status(201).json({
                carsProblems: result
            });
        } catch(err) {
            console.error(`Возникла проблема в запросе при вызове просмотра всех проблем у автомобилей: ${err.message}`)
            res.status(500).json({message: 'Возникла проблема в запросе при вызове просмотра всех проблем у автомобилей'})
        } finally {
            clien.release();
        }
    } catch(err) {
        console.error(`Возникла проблема на сервере при вызове просмотра всех проблем у автомобилей: ${err.message}`)
        res.status(500).json({message: 'Возникла проблема на сервере при вызове просмотра всех проблем у автомобилей'})
    };
});

// добавление описания автомобиля (на странице администратора)
app.post('/addcardescription', async (req, res) => {
    const {description, car_id} = req.body

    if (!description || !car_id) {
        res.status(400).json({emptyInputsMessage: 'Все поля должны быть заполнены'});
    }

    try {
        const client = await pool.connect();

        try {
            const carReuqire = await client.query(
                'SELECT * FROM cars_table WHERE car_id = $1',
                [car_id]
            )
            if (carReuqire.rowCount < 1) {
                return res.status(400).json({noCarInDb: `В базе данных нет автомобиля с таким id: ${car_id}`});
            }

            const descriptionRequire = await client.query(
                'SELECT * FROM car_short_description_table WHERE car_id = $1',
                [car_id]
            )
            if (descriptionRequire.rowCount > 0) {
                return res.status(400).json({duplicateDescriptionMessage: `В базе данных уже есть краткое описание автомобиля с id: ${car_id}`});
            }

            const response = await client.query(
                'INSERT INTO car_short_description_table (description, car_id) VALUES ($1, $2) RETURNING description, car_id', [description, car_id]
            )
            const carDescription = response.rows[0].description;
            const carId = response.rows[0].car_id;
            
            res.status(200).json({
                successAddDescription: 'Описание успешно добавлено',
                carDescription: carDescription,
                carId: carId
            });
        } catch(err) {
            console.error(`Не удалось добавить описание автомобилю из-за ошибки в запросе: ${err.message}`);
            res.status(500).json({message: 'Не удалось добавить описание автомобилю из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Не удалось добавить описание автомобилю из-за ошибки на сервере: ${err.message}`);
        res.status(500).json({message: 'Не удалось добавить описание автомобилю из-за ошибки на сервере'});
    }
});


// загрузка фотографии (на странице администратора)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/uploadimage', upload.single('image'), async (req, res) => {
    const image = req.file.buffer;
    const {carId, carModelName} = req.body;
        
    if (!carId || !carModelName || !image) {
        console.log('Одно из полей не заполнено');
        return res.status(400).json({emptyInputError: 'Все поля должны быть заполены'});
    };
    
    try {
        const client = await pool.connect();

        try {
            const result = await client.query(
                'INSERT INTO images_table (car_id, src, for_car_name) VALUES ($1, $2, $3) RETURNING image_id, car_id', 
                [carId, image, carModelName]
            ); 
            // добавить пояснялку на страницу, что нужен НОМЕР модели в поле ввода названия модели-- w204, gc8, ek2, b240
            
            if (result.rows.length === 0) {
                console.log('На сервер был отправлен пустой массив, данные не получены, не загружены.');
                return res.status(400).json({errorUploadImage: 'Изображение не было загружено'});
            };

            const uploadIds = {
                imageId: result.rows[0].image_id,
                whatCarId: result.rows[0].car_id
            };

            return res.status(200).json({
                successUploadImage: 'Изображение было успешно загружено',
                uploadedResult: uploadIds
            });
        } catch (err) {
            console.error(`Ошибка загрузки изображения, из-за ошибки в запросе ${err.message}`)
            return res.status(500).json({message: 'Ошибка загрузки изображения, из-за ошибки в запросе'})
        } finally {
            client.release();
        }
    } catch (err){
        console.error(`Ошибка загрузки изображения, из-за ошибки на сервере ${err.message}`)
        return res.status(500).json({message: 'Ошибка загрузки изображения, из-за ошибки на сервере'})
    }
});


// Получение фотографии автомобиля
app.post('/getcarimage', async (req, res)=> {
    const { car_id } = req.body;

    if (!car_id) {
        return res.status(400).json({ carIdError: 'Не получается прочесть id автомобиля' });
    }

    try {
        const client = await pool.connect();

        try {
            const result = await client.query(`
                SELECT it.src 
                FROM cars_table AS ct 
                LEFT JOIN images_table AS it 
                ON ct.car_id = it.car_id 
                WHERE ct.car_id = $1
            `, [car_id]);

            if (result.rows.length === 0 || !result.rows[0].src) {
                return res.status(400).json({ imageError: 'Ошибка получения изображения, с ним что-то не так' });
            }

            const imageSrc = result.rows[0].src;
            const base64Image = imageSrc.toString('base64');
            console.log(base64Image);

            return res.status(200).json({
                successGetCarImage: 'Изображение успешно получено',
                selectedImage: `data:image/png;base64,${base64Image}`
            });
        } catch(err) {
            console.error(`Ошибка получения фотографии автомобиля, из-за ошибки в запросе ${err.message}`)
            return res.status(500).json({message: 'Ошибка получения фотографии автомобиля, из-за ошибки в запросе'})
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Ошибка получения фотографии автомобиля, из-за ошибки в запросе ${err.message}`)
        return res.status(500).json({message: 'Ошибка получения фотографии автомобиля, из-за ошибки в запросе'})
    }
})


// обновление номера модели автомобиля (на странице администратора)
app.put('/updatemodel', async (req, res) => {
    const {car_id, model_number} = req.body;

    if (!car_id || !model_number) {
        return res.status(400).json({emptyInputsMessage: 'Все поля должны быть заполнены'})
    }

    try {
        const client = await pool.connect();

        try {
            const exitingCar = await client.query(
                'SELECT * FROM cars_table WHERE car_id = $1', [car_id]
            )
            if (exitingCar.rowCount < 1) {
                return res.status(400).json({noCarInDb: 'В базе данных не существует автомобиля с таким ID'})
            }

            const exitingModelNumber = await client.query(
                'SELECT * FROM cars_table WHERE model_number = $2 AND car_id != $1', [car_id, model_number]
            )
            if (exitingModelNumber.rowCount > 0) {
                return res.status(400).json({message: 'В базе данных уже присутствует автомобиль с таким номером модели'})
            }

            const response = await client.query(
                'UPDATE cars_table SET model_number = $2 WHERE car_id = $1 RETURNING car_id, model_number', [car_id, model_number]
            )
            const carId = response.rows[0].car_id;
            const modelNumber = response.rows[0].model_number;

            res.status(201).json({
                successUpdateModelNumber: 'Обновленная машина',
                carId: carId,
                modelNumber: modelNumber
            });
        } catch(err) {
            console.error(`Ошибка обновления модели автомобиля, из-за ошибки в запросе ${err.message}`)
            return res.status(500).json({message: 'Ошибка обновления модели автомобиля, из-за ошибки в запросе'})
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Ошибка обновления модели автомобиля, из-за ошибки на сервере ${err.message}`)
        return res.status(500).json({message: 'Ошибка обновления модели автомобиля, из-за ошибки на сервере'})
    };
});

// удаление автомобиля (на странице администратора)
app.delete('/deletecar', async (req, res) => {
    const {car_id} = req.body;

    if (!car_id) {
        return res.status(400).json({emptyInputsMessage: 'Поле не может быть пустым'})
    }

    try {
        const client = await pool.connect();

        try {
            const exitingCar = await client.query(
                'SELECT * FROM cars_table WHERE car_id = $1', [car_id]
            )
            if (exitingCar.rowCount < 1) {
                return res.status(400).json({noCarInDb: `В базе данных не существует автомобиля в таким id: ${car_id}`})
            }

            const result = await client.query(
                'DELETE FROM cars_table WHERE car_id = $1 RETURNING car_id', [car_id]
            )
            const carId = result.rows[0].car_id;

            res.status(201).json({
                successDeleteCar: 'Удаленный автомобиль',
                carId: carId
            });
        } catch(err) {
            console.log(`Ошибка удаления автомобиля из-за ошибки в запросе: ${err.message}`);
            return res.status(500).json({message: 'Ошибка удаления автомобиля из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.log(`Ошибка удаления автомобиля из-за ошибки на сервере: ${err.message}`);
        return res.status(500).json({message: 'Ошибка удаления автомобиля из-за ошибки на сервере'});
    };
});

// получение информации о профиле пользователя
app.get('/getuserinfo', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = await pool.connect();

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.userId;

        const response = await client.query(
            'SELECT * FROM users_table where user_id = $1', [userId]
        )
        const result = response.rows[0];

        res.status(200).json({
            message: 'Информация о пользователе',
            userInfo: {
                name: result.name,
                surname: result.surname,
                email: result.email,
                // phone_number: result.phone_number,
            }
        });
    } catch (err) {
        console.error('Ошибка при выводе информации о пользователе из-за ошибки в запросе ' + err);
        res.status(500).send('Ошибка при выводе информации о пользователе из-за ошибки в запросе');
    } finally {
        client.release();
    }
})

// изменение информации о пользователе в профиле
app.put('/changeuserinfo', async (req, res) => {
    const {name, surname, email} = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    const client = await pool.connect();

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.userId;

        const changeName = await client.query(
            'UPDATE users_table SET name = $2 WHERE user_id = $1', [userId, name]
        )
        const changeSurname = await client.query(
            'UPDATE users_table SET surname = $2 WHERE user_id = $1', [userId, surname]
        )
        const changeEmail = await client.query(
            'UPDATE users_table SET email = $2 WHERE user_id = $1', [userId, email]
        )
        // const changePhoneNumber = await client.query(
        //     'UPDATE users_table SET phone_number = $2 WHERE user_id = $1', [userId, phone_number]
        // )

        res.status(200).json({message: 'Данные пользователя успешно обновлены'})
    } catch (err) {
        console.error('Ошибка при изменении данных пользователя на стороне сервера' + err);
        res.status(500).send('Ошибка при изменении данных пользователя на стороне сервера');
    } finally {
        client.release();
    }
})

// работа фильтров
app.post('/getfilteredcars', async (req, res) => {
    const filters = req.body.filtersNames; 
    if (!Array.isArray(filters) || filters.length === 0) {
        return res.status(400).json({ message: 'Массив названий фильтров не предоставлен' });
    } else if (filters.length < 8) {
        return res.status(400).json({ noFilterMessage: 'Одного из фильтров не хватает, пожалуйста, заполните все поля'});
    } 

    const filtersConditions = [];
    const filtersValues = [];

    if (filters[0] === 'Любая') {
        filtersConditions.push(`(brand = $${filtersValues.length + 1} OR brand LIKE '%')`);
        filtersValues.push(filters[0]);
        console.log('проверка на любую модель')
    } else if (filters[0]) {
        filtersConditions.push(`(brand = $${filtersValues.length + 1})`);
        filtersValues.push(filters[0]);
        console.log('выбор по модели')
    } 

    if (filters[1] === 'Любая') {
        filtersConditions.push(`(gearbox = $${filtersValues.length + 1} OR gearbox LIKE '%')`);
        filtersValues.push(filters[1]);
        console.log('проверка на любую коробку передач');
    } else if (filters[1]) {
        filtersConditions.push(`(gearbox = $${filtersValues.length + 1})`);
        filtersValues.push(filters[1]);
        console.log('выбор по опреденной коробке');
    }

    if (filters[2] === 'Любой') {
        filtersConditions.push(`(body_type = $${filtersValues.length + 1} OR body_type LIKE '%')`);
        filtersValues.push(filters[2]);
        console.log('проверка на любой тип кузова');
    } else if (filters[2]) {
        filtersConditions.push(`(body_type = $${filtersValues.length + 1})`);
        filtersValues.push(filters[2]);
        console.log('выбор по определенному типу кузова');
    }

    if (filters[3] === 'Любой') {
        filtersConditions.push(`(car_vehicle = $${filtersValues.length + 1} OR car_vehicle LIKE '%')`);
        filtersValues.push(filters[3]);
        console.log('проверка на любой тип привода');
    } else if (filters[3]) {
        filtersConditions.push(`(car_vehicle = $${filtersValues.length + 1})`);
        filtersValues.push(filters[3]);
        console.log('выбор по определенному типу привода');
    } 

    if (filters[4] && filters[5]) {
        filtersConditions.push(`( release_date BETWEEN $${filtersValues.length + 1}::date AND $${filtersValues.length + 2}::date
            OR (end_release_date BETWEEN $${filtersValues.length + 1}::date AND $${filtersValues.length + 2}::date)
            OR (release_date <= $${filtersValues.length + 1}::date AND end_release_date >= $${filtersValues.length + 2}::date)
            OR (release_date = $${filtersValues.length + 2}::date AND end_release_date >= $${filtersValues.length + 1}::date)
         )`);
        filtersValues.push(filters[4], filters[5]);
    }

    const startPrice = parseInt(filters[6]);
    const endPrice = parseInt(filters[7]);

    if (startPrice && endPrice) {
        filtersConditions.push(`( price_start BETWEEN $${filtersValues.length + 1}::int AND $${filtersValues.length + 2}::int
            OR price_end BETWEEN $${filtersValues.length + 1}::int AND $${filtersValues.length + 2}::int
            OR price_start < $${filtersValues.length + 1}::int AND price_end > $${filtersValues.length + 2}::int )`);
        filtersValues.push(startPrice, endPrice);
    }
    
    const query = `
        SELECT * FROM cars_table
        ${filtersConditions.length ? 'WHERE ' + filtersConditions.join(' AND ') : ''}
    `;
    
    // для проверки
    console.log(filters[0]);
    console.log(filters.length);
    console.log(filtersValues);
    console.log(query);

    try {
        const client = await pool.connect();
        try {
            const response = await client.query(query, filtersValues);
            const result = response.rows;

            res.status(201).json({ allFilteredCars: result });
        } catch (err) {
            console.error(`Ошибка вывода автомобилей: ${err.message}`);
            res.status(400).json({ message: 'Ошибка вывода автомобилей из-за ошибки в запросе' });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка вывода автомобилей: ${err.message}`);
        res.status(500).json({ message: 'Ошибка вывода автомобилей из-за ошибки на сервере' });
    }
});

// добавление автомобиля в избранное
app.post('/addcartofavorite', async(req, res) => {
    const {email, car_id} = req.body;

    if (!email || !car_id) {
        return res.status(400).json({message: 'Не получается получить id автомобиля или электронную почту пользователя'});
    }

    try {
        const client = await pool.connect();
        try {
            const userResponse = await client.query(`SELECT user_id FROM users_table WHERE email = $1`, [email]);
            console.log(userResponse);
            
            const userId = userResponse.rows[0].user_id;
            console.log('id пользователя ' + userId);
            
            const exitingFavoriteCar = await client.query(`SELECT user_id, car_id 
                FROM user_cars_table 
                WHERE user_id = $1 AND car_id = $2`, 
                [userId, car_id]
            )
            if (exitingFavoriteCar.rowCount > 0) {
                return res.status(400).json({favoriteCarErrorMessage: 'Данный автомобиль уже присутствует в избранном'});
            }

            const result = await client.query(`INSERT INTO user_cars_table (user_id, car_id) VALUES ($1, $2) RETURNING user_id, car_id`, [userId, car_id])
            console.log(result);

            const addedUserId = result.rows[0].user_id;
            const addedCarId = result.rows[0].car_id;

            res.status(201).json({
                successFavoriteMessage: 'Данные',
                userid: addedUserId,
                carid: addedCarId
            });
        } catch (err) {
            console.error(`Ошибка при добавлении автомобиля в избранное: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при добавлении автомобиля в избранное из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при добавлении автомобиля в избранное: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при добавлении автомобиля в избранное из-за ошибки на сервере'});
    }
})

// удаление автомобиля из избранного 
app.delete('/deletecarfromfavorite', async(req, res) => {
    const {email, car_id} = req.body;

    if (!email || !car_id) {
        return res.status(400).json({message: 'Не получается прочесть id автомобиля или электронную почту пользователя'});
    }

    try {
        const client = await pool.connect();
        try {
            const userResponse = await client.query(`SELECT user_id FROM users_table WHERE email = $1`, [email]);
            console.log(userResponse);
            
            const userId = userResponse.rows[0].user_id;
            console.log('id пользователя ' + userId);
            

            const result = await client.query(`DELETE FROM user_cars_table where car_id = $1 AND user_id = $2 RETURNING car_id, user_id`, [car_id, userId])
            console.log(result);

            const deletedUserId = result.rows[0].user_id;
            const deletedCarId = result.rows[0].car_id;

            res.status(201).json({
                successDeleteFromFavoriteMessage: 'Удаленные данные',
                userid: deletedUserId,
                carid: deletedCarId
            });
        } catch (err) {
            console.error(`Ошибка при удалении автомобиля из избранного: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при удалении автомобиля из избранного из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при удалении автомобиля из избранного: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при удалении автомобиля из избранного из-за ошибки на сервере'});
    }
})


// Запрос на проверку нахожения автомобиля в избранном
app.post('/checkcarinfavorite', async (req, res) => {
    const {email, car_id} = req.body;

    if (!email || !car_id) {
        return res.status(400).json({ message: 'Не получается прочесть id автомобиля или электронную почту пользователя' });
    }

    try {
        const client = await pool.connect();
        try {
            const userResponse = await client.query(`SELECT user_id FROM users_table WHERE email = $1`, [email]);
            const userId = userResponse.rows[0].user_id;

            const exitingFavoriteCar = await client.query(`SELECT car_id FROM user_cars_table WHERE user_id = $1 AND car_id = $2`, [userId, car_id]);

            res.status(201).json({ carInFavorite: exitingFavoriteCar.rowCount > 0 });
        } catch (err) {
            console.error(`Ошибка при проверке автомобиля в избранном: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при проверке автомобиля в избранном из-за ошибки в запросе' });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при проверке автомобиля в избранном: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при проверке автомобиля в избранном из-за ошибки на сервере' });
    }
});


// Получение всех автомобилей для определенного пользователя
app.post('/getfavoritecars', async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.status(400).json({noEmailMessage: 'Не удается прочесть email пользователя'});
    }

    try {
        const client = await pool.connect();

        try {
            const userResponse = await client.query(`SELECT user_id FROM users_table WHERE email = $1`, [email]);
            const userId = userResponse.rows[0].user_id;

            const userFavoriteCars = await client.query(`SELECT car_id FROM user_cars_table WHERE user_id = $1`, [userId]);
            if (userFavoriteCars.rowCount < 1) {
                return res.status(200).json({noCarsInFavorite: 'У пользователя нет автомобилей в избранном', cars: []});
            }

            const carIds = userFavoriteCars.rows.map(row => row.car_id);
            const favoriteCarsData = await client.query(`SELECT * FROM cars_table WHERE car_id = ANY($1::int[])`, [carIds])

            return res.status(200).json({
                favoriteCarsMessage: 'Все избранные автомобили',
                favoriteCars: favoriteCarsData.rows 
            })
        } catch (err) {
            console.error(`Ошибка при получении автомобилей из избранного: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при получении автомобилей из избранного из-за ошибки в запросе' });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при получении автомобилей из избранного: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при получении автомобилей из избранного из-за ошибки на сервере' });
    }
});


// Получение определенного автомобиля из базы данных
app.post('/getcardata', async (req, res) => {
    const {car_id} = req.body;

    if (!car_id) {
        return res.status(400).json({noCarIdMessage: 'Невозможно прочесть id автомобиля'});
    }

    try {
        const client = await pool.connect();

        try {
            const response = await client.query(`SELECT * FROM cars_table WHERE car_id = $1`, [car_id]);
            const carData = response.rows;


            const engineId = response.rows[0].engine_id;
            console.log('Полученный id двигателя : ' + engineId);
            if (engineId === null || !engineId) {
                return res.status(400).json({noEngineId: 'Не удалось получить id - автомобиля'})
            }
            const engineResponse = await client.query(`SELECT * FROM engine_table WHERE engine_id = $1`, [engineId]);
            const engineData = engineResponse.rows;
            

            const carProblems = await client.query(`SELECT problem_id FROM car_problems_table WHERE car_id = $1`, [car_id]);
            // if (carProblems.rowCount < 1) {
            //     return res.status(200).json({noCarsInFavorite: 'У данного автомобиля нет проблем, или они ещё не добавлены', problems: []});
            // }

            const problemIds = carProblems.rows.map(row => row.problem_id);
            const selectedProblems = await client.query(`SELECT * FROM problems_table WHERE problem_id = ANY($1::int[])`, [problemIds]);
            const carProblemsData = selectedProblems.rows;

            return res.status(200).json({
                successGetCarData: 'Данные об автомобле получены успешно',
                selectedCarData: carData,
                carEngineData: engineData,
                carProblemsData: carProblemsData
            });
        } catch (err) {
            console.error(`Ошибка при получении данных автомобиля из-за ошибки в запросе: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при получении данных автомобиля из-за ошибки в запросе' });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при получении данных автомобиля из-за ошибки на сервере: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при получении данных автомобиля из-за ошибки на сервере' });
    }
});


// Получение описания автомобиля 
app.post('/getcardescription', async(req, res) => {
    const { car_id } = req.body;

    if (!car_id) {
        return res.status(400).json({noCarIdMessage: 'Невозможно прочесть id автомобиля'});
    }

    try {
        const client = await pool.connect();

        try {
            const response = await client.query(`SELECT csdt.description 
                FROM cars_table AS ct 
                LEFT JOIN car_short_description_table AS csdt 
                ON ct.car_id = csdt.car_id 
                WHERE ct.car_id = $1`, [car_id]);
            const carDescription = response.rows[0].description;

            if (carDescription === null) {
                return res.status(200).json({
                    noDescription: 'У данного автомобиля пока что нету описания. Но вскоре обязательно появится!'
                })
            }
            
            return res.status(200).json({
                successGetCarDescription: 'Описание автомобиля получено успешно',
                selectedCarDescription: carDescription
            });
        } catch (err) {
            console.error(`Ошибка при получении описания автомобиля из-за ошибки в запросе: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при получении описания автомобиля из-за ошибки в запросе' });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при получении описания автомобиля из-за ошибки на сервере: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при получении описания автомобиля из-за ошибки на сервере' });
    }
})


// Получение списка всех пользователей
app.get('/getallusers', async(req, res) => {
    try {
        const client = await pool.connect();

        try {
            const response = await client.query(`
                SELECT ut.user_id, ut.name, ut.surname, ut.email, ut.password, rt.role_name
                FROM users_table AS ut 
                INNER JOIN roles_table AS rt 
                ON ut.user_id = rt.user_id
                ORDER BY ut.user_id;
            `);

            const allUsers = response.rows;

            if (allUsers.length <= 0) {
                return res.status(200).json({noUsersMessage: 'В системе нет зарегистрированных пользователей'});
            }
            
            console.log(allUsers);

            return res.status(200).json({
                successGetAllUsers: 'Список зарегистрированных пользователей получен успешно',
                allUsers: allUsers
            });
        } catch (err) {
            console.error(`Ошибка при получении всех пользователей из-за ошибки в запросе: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при получении всех пользователей из-за ошибки в запросе' });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при получении всех пользователей из-за ошибки на сервере: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при получении всех пользователей из-за ошибки на сервере' });
    }
})


// Добавление роли администратора пользователю
app.put('/addrigthsadministrator', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({noUserIdError: 'Невозможно прочесть id-пользователя'});
    }

    try {
        const client = await pool.connect();

        try {
            const response = await client.query(`
                UPDATE roles_table 
                SET role_name = 'admin' 
                WHERE user_id = $1
                `, [user_id]
            )
            // const adminResult = response.rows;
            // console.log(adminResult);

            // const userID = adminResult.rows[0].user_id;
            // const roleName = adminResult.rows[0].role_name;

            return res.status(200).json({
                successAddAdministratorRights: `Права администратора добавлены пользователю с ID ${user_id}, теперь он АДМИНИСТРАТОР`
            })

        } catch (err) {
            console.error(`Ошибка при добавлении прав администратора пользователю из-за ошибки в запросе: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при добавлении прав администратора пользователю из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при добавлении прав администратора пользователю из-за ошибки на сервере: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при добавлении прав администратора пользователю из-за ошибки на сервере'});
    }
})


// Замена роли администратора (admin) у пользователя на обычного пользователя (user)
app.put('/deleterigthsadministrator', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({noUserIdError: 'Невозможно прочесть ID пользователя'});
    }

    try {
        const client = await pool.connect();

        try {
            const response = await client.query(`
                UPDATE roles_table 
                SET role_name = 'user' 
                WHERE user_id = $1
                `, [user_id]
            )

            return res.status(200).json({
                successDeleteAdministratorRights: `Права администратора отозваны у пользователя с ID ${user_id}, теперь он ПОЛЬЗОВАТЕЛЬ`
            })

        } catch (err) {
            console.error(`Ошибка при удалении прав администратора у пользователя из-за ошибки в запросе: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при удалении прав администратора у пользователя из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(`Ошибка при удалении прав администратора у пользователя из-за ошибки на сервере: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при удалении прав администратора у пользователя из-за ошибки на сервере'});
    }
})


// Проверка роли администратора у пользователя
app.post('/checkadministratorstatus', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({noUserIdError: 'Не получается прочесть ID пользователя'});
    }

    try {
        const client = await pool.connect();

        try {
            const response = await client.query(`
                SELECT role_name FROM roles_table WHERE user_id = $1`, [user_id]
            )

            const userRoleName = response.rows[0].role_name;

            if (userRoleName === 'admin') {
                return res.status(200).json({userIsAdmin: `У пользователя с ID ${user_id} имеются права администратра`})
            } else if (userRoleName === 'user') {
                return res.status(200).json({userIsNotAdmin: `У пользователя с ID ${user_id} нет прав администратра. Он обычный пользователь`})
            }
        } catch(err) {
            console.error(`Ошибка при проверке прав администратора у пользователя из-за ошибки в запросе: ${err.message}`);
            res.status(400).json({ message: 'Ошибка при проверке прав администратора у пользователя из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.error(`Ошибка при проверке прав администратора у пользователя из-за ошибки на сервере: ${err.message}`);
        res.status(400).json({ message: 'Ошибка при проверке прав администратора у пользователя из-за ошибки на сервере'});
    }
});


// Удаление двигателя
app.delete('/deleteengine', async (req, res) => {
    const {engine_serial_name} = req.body;

    if (!engine_serial_name) {
        return res.status(400).json({emptyInputMessage: 'Поле не может быть пустым'})
    }

    try {
        const client = await pool.connect();

        try {
            const exitingEngineId = await client.query(
                'SELECT engine_id FROM engine_table WHERE engine_serial_name = $1', [engine_serial_name]
            )
            if (exitingEngineId.rowCount < 1) {
                return res.status(400).json({noEngineInDb: `В базе данных не существует такого двигателя`})
            }
            const engine_id = exitingEngineId.rows[0].engine_id;

            const result = await client.query(
                'DELETE FROM engine_table WHERE engine_id = $1 RETURNING engine_id', [engine_id]
            )
            const engineId = result.rows[0].engine_id;

            res.status(201).json({
                seccessDeleteEngine: `Удаленный двигатель: ${engine_serial_name} ID: ${engineId}`,
                engineId: engineId
            });
        } catch(err) {
            console.log(`Ошибка удаления двигателя из-за ошибки в запросе: ${err.message}`);
            return res.status(500).json({message: 'Ошибка удаления двигателя из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.log(`Ошибка удаления двигателя из-за ошибки на сервере: ${err.message}`);
        return res.status(500).json({message: 'Ошибка удаления двигателя из-за ошибки на сервере'});
    };
})


// Удаление описания у автомобиля
app.delete('/deletecardescription', async (req, res) => {
    const {car_id} = req.body;

    if (!car_id) {
        return res.status(400).json({emptyInputsMessage: 'Нужно ввести ID автомобиля для заполнения'})
    }

    try {
        const client = await pool.connect();

        try {
            const exitingCarDescription = await client.query(
                'SELECT description FROM car_short_description_table WHERE car_id = $1', [car_id]
            )
            if (exitingCarDescription.rowCount < 1) {
                return res.status(400).json({noCarDescriptionInDb: `В базе данных не существует такого автомобиля и его описания`})
            }

            const result = await client.query(
                `DELETE FROM car_short_description_table 
                WHERE car_id = $1
                RETURNING car_id, description`, [car_id]
            )
            const carDescription = result.rows[0].description;
            const carId = result.rows[0].car_id;

            res.status(201).json({
                seccessDeleteCarDescription: `Описание автомобиля с ID: ${carId} - удалено. Описание: ${carDescription}`,
                carId: carId
            });
        } catch(err) {
            console.log(`Ошибка удаления описания автомобиля из-за ошибки в запросе: ${err.message}`);
            return res.status(500).json({message: 'Ошибка удаления описания автомобиля из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.log(`Ошибка удаления описания автомобиля из-за ошибки на сервере: ${err.message}`);
        return res.status(500).json({message: 'Ошибка удаления описания автомобиля из-за ошибки на сервере'});
    };
})


// Удаление проблемы
app.delete('/deleteproblem', async (req, res) => {
    const {problem_name} = req.body;

    if (!problem_name) {
        return res.status(400).json({emptyInputMessage: 'Нужно ввести название проблемы для её удаления'})
    }

    try {
        const client = await pool.connect();

        try {
            const exitingCarProblem = await client.query(
                'SELECT problem_id FROM problems_table WHERE problem_name = $1', [problem_name]
            )
            if (exitingCarProblem.rowCount < 1) {
                return res.status(400).json({noProblemInDb: `Проблемы с таким названием не существует в базе данных`})
            }

            const result = await client.query(
                `DELETE FROM problems_table
                WHERE problem_name = $1
                RETURNING problem_id, problem_name;`, [problem_name]
            )
            const problemId = result.rows[0].problem_id;
            const problemName = result.rows[0].problem_name;

            res.status(201).json({
                successDeleteProblem: `Проблема с названием ${problemName} - удалена. ID проблемы: ${problemId}`,
                problemId: problemId,
                problemName: problemName
            });
        } catch(err) {
            console.log(`Ошибка удаления описания автомобиля из-за ошибки в запросе: ${err.message}`);
            return res.status(500).json({message: 'Ошибка удаления описания автомобиля из-за ошибки в запросе'});
        } finally {
            client.release();
        }
    } catch(err) {
        console.log(`Ошибка удаления описания автомобиля из-за ошибки на сервере: ${err.message}`);
        return res.status(500).json({message: 'Ошибка удаления описания автомобиля из-за ошибки на сервере'});
    };
})