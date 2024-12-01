const singUpButton = document.querySelector('.sing-up-button');
const singInButton = document.querySelector('.sing-in-button');
const logOutButton = document.querySelector('.log-out-button');
const addEngineButton = document.querySelector('.add-engine-button');
const showEnginesButton = document.querySelector('.show-engines-button');
const addCarButton = document.querySelector('.add-car-button');
const showCarsButton = document.querySelector('.show-cars-button');
const addProblemButton = document.querySelector('.add-problem-button');
const showProblemsButton = document.querySelector('.show-problems-button');
const addProblemToCarButton = document.querySelector('.add-problem-to-car-button')
const uploadImageButton = document.querySelector('.upload-image-button');

// регистрация пользователя
if (singUpButton) {
    singUpButton.addEventListener('click', async () => {
        const name = document.querySelector('.name-input').value;
        const surname = document.querySelector('.surname-input').value;
        const password = document.querySelector('.password-input').value;
        const email = document.querySelector('.email-input').value;
    
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, surname, password, email }),
        });
    
        const data = await response.json();
        data ? alert('Вы успешно зарегистрировались') : console.log('Вы зарегистрировались не успешо');

        console.log(data);
    });
};

// вход пользователя
if (singInButton) {
    singInButton.addEventListener('click', async () => {
        const password = document.querySelector('.password-input').value;
        const email = document.querySelector('.email-input').value;

        const singInWindow = document.querySelector('.sing-in-window-container'); // временно(возможно)
        const adminPageBtn = document.querySelector('.admin-page-button'); // временно(возможно)
        const logOutButton = document.querySelector('.log-out-button'); // временно(возможно)

        // для проверки, отслеживания вводимых данных
        console.log('Email:', email, 'Password:', password);

        try {
            const data = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, email }),
            })
            .then(response => response.json());


            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('email', data.email);
            window.localStorage.setItem('role', data.role);

            // админ или нет? обработка // временно
            if (data.role === 'admin') {
                adminPageBtn.style.display = 'block';
                alert('Вы вошли как администратор');
            } else if (data.role === 'user'){
                adminPageBtn.style.display = 'none';
                alert('Добро пожаловать !');
            } else {
                alert('Неверный логин или пароль');
            };
            
            // для показа/скрытия окна входа при нажатии
            const token = window.localStorage.getItem('token');
            if (token && token !== 'undefined'){          
                singInWindow.style.display = 'none';
                logOutButton.style.display = 'block';
            } else {
                console.log('Ошибка авторизации');
            }

            console.log(data);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    });
};

// функции для проверки условий, для отображдения/скрытия контента на странице
// небъяснимая пока что ошибка -- при adminPageButton ругается на первую строку файла, и говорит что такая переменная уже существует
// при других значениях все работает исправно
// проверка, является ли администратором авторизованный пользователь || отображать/не отображать кнопку страицы администратора
const checkAdmin = () => {
    const admin = window.localStorage.getItem('role');
    const adminPageBtn = document.querySelector('.admin-page-button');

    if (admin === 'admin') {
        adminPageBtn ? adminPageBtn.style.display = 'block' : null;
    } else {
        adminPageBtn ? adminPageBtn.style.display = 'none' : null;
    }
};

// проверка, лежит ли в localstorage токен, нужно для скрытия окна входа/показа кнопки выхода из аккаунта
const checkAutorize = () => {
    const token = window.localStorage.getItem('token');
    const logOutButton = document.querySelector('.log-out-button');

    if (token && token !== 'undefined') {
        const singInWindow = document.querySelector('.sing-in-window-container');
        singInWindow ? singInWindow.style.display = 'none' : null;

        logOutButton ? logOutButton.style.display = 'block' : null;
    } else {
        logOutButton ? logOutButton.style.display = 'none' : null;
        console.log('пользователь не авторизован');
    }
};

// фукция для кнопки выхода из аккаунта
const logOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('role');

    alert('Вы вышли из аккаунта');

    window.location.reload();
}
// кнопка выхода // попробовал тернарный оператор
logOutButton ? logOutButton.addEventListener('click', logOut)  // if
: !logOutButton || logOutButton && !logOutButton.style.display === 'block' ? console.log('Кнопки выхода нет на странице или она не отображается') // else if
: console.log('Ошибка с кнопкой выхода из аккаунта'); // else
// обновление окон
window.addEventListener('DOMContentLoaded', checkAdmin);
window.addEventListener('DOMContentLoaded', checkAutorize);

// добавление двигателя (на странице администратора)
if (addEngineButton) {
    addEngineButton.addEventListener('click', async () => {
        const engine_serial_name = document.querySelector('.serial-number-input').value;
        const engine_size = document.querySelector('.engine-size-input').value;
        const engine_type = document.querySelector('.engine-type-input').value;
        const engine_nano = document.querySelector('.engine-nano-input').value;
        const engine_horse_power = document.querySelector('.engine-horse-power-input').value;
        const engine_expenditure_city = document.querySelector('.engine-expenditure-city-input').value;
        const engine_expenditure_track = document.querySelector('.engine-expenditure-track-input').value;
        const camshaft_system = document.querySelector('.camshaft-system-input').value;

        const response = await fetch('http://localhost:3000/addengine', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system})
        });

        const data = await response.json();

        console.log(data);
    });
};

// просмотр всех двигателей
if (showEnginesButton) {
    showEnginesButton.addEventListener('click', async () => {
        const overlay = document.querySelector('.overlay');
        const engineModalWindow = document.querySelector('.engine-modal-window'); // модалка
        const engineModalCloseButton = document.querySelector('.engine-modal-close-button'); // кнопка в модалке
        const engineWindowContent = document.querySelector('.engine-window-content'); // контент внутри модалки

        const response = await fetch('http://localhost:3000/getengines', {
            method: 'GET'
        });

        const data = await response.json();
        if (data) {
            engineModalWindow ? engineModalWindow.style.display = 'block' : null;
            overlay ? overlay.classList.add('show') : null; // добавляет display: block;
            engineWindowContent.innerHTML = JSON.stringify(data, null, 2);
        } else {
            engineModalWindow ? engineModalWindow.style.display = 'none' : null;
            overlay ? overlay.classList.remove('show') : null; // добавляет display: block;
        }

        engineModalCloseButton.addEventListener('click', () => {
            engineModalWindow ? engineModalWindow.style.display = 'none' : null;
            overlay ? overlay.classList.remove('show') : null;
        });

        console.log(data);
    });
};

// добавление автомобиля (на странице администратора)
if (addCarButton) {
    addCarButton.addEventListener('click', async () => {
        const concern = document.querySelector('.concern-input').value;
        const brand = document.querySelector('.brand-input').value;
        const model_name = document.querySelector('.model-input').value;
        const generation = document.querySelector('.generation-input').value;
        const model_number = document.querySelector('.model-number-input').value;
        const release_date = document.querySelector('.release-date-input').value;
        const end_release_date = document.querySelector('.end-release-date-input').value;
        const engine_id = document.querySelector('.engine-id-input').value;
        const gearbox = document.querySelector('.gearbox-input').value;
        const car_vehicle = document.querySelector('.vehicle-input').value;
        const body_type = document.querySelector('.body-type-input').value;
        const price = document.querySelector('.price-input').value;

        const response = await fetch('http://localhost:3000/addcar', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, gearbox, car_vehicle, body_type, price})
        });

        const data = await response.json();

        if (!data.engine_id) {
            alert(`В базе данных нет двигателя с таким id: ${data.engine_id}`)
        } else {
            console.log(data);
        };
    });
};

// просмотр всех автомобилей (на странице администратора)
if (showCarsButton) {
    showCarsButton.addEventListener('click', async () => {
        const overlay = document.querySelector('.overlay');
        const carModalCloseButton = document.querySelector('.car-modal-close-button');
        const carModalWindow = document.querySelector('.car-modal-window');
        const carWindowContent = document.querySelector('.car-window-content');

        const response = await fetch('http://localhost:3000/getcars', {
            method: 'GET'
        });

        const data = await response.json();

        if (data) {
            overlay ? overlay.classList.add('show') : null; // добавляет display: block
            carModalWindow ? carModalWindow.style.display = 'block' : null;
            carWindowContent.innerHTML = JSON.stringify(data, null, 2);
        } else {
            overlay ? overlay.classList.remove('show') : null; // убирает display: block
        };

        carModalCloseButton.addEventListener('click', () => {
            carModalWindow ? carModalWindow.style.display = 'none' : null;
            overlay ? overlay.classList.remove('show') : null; // добавляет display: block;
        });

        console.log(data);
    });
};

// добавление проблемы (на странице администратора)
if (addProblemButton) {
    addProblemButton.addEventListener('click', async () => {
        const problem_name = document.querySelector('.problem-name-input').value;
        const problem_short_description = document.querySelector('.problem-description-input').value;
        const difficult = document.querySelector('.problem-difficult-input').value;
        const how_to_fixed = document.querySelector('.problem-how-to-fixed-input').value;
        const price = document.querySelector('.problem-price-input').value;

        const response = await fetch('http://localhost:3000/addproblem', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({problem_name, problem_short_description, difficult, how_to_fixed, price})
        });
        const data = await response.json();

        console.log(data);
    });
};

// просмотр всех проблем (на странице администратора)
if (showProblemsButton) {
    showProblemsButton.addEventListener('click', async () => {
        const overlay = document.querySelector('.overlay');
        const problemModalCloseButton = document.querySelector('.problem-modal-close-button');
        const problemModalWindow = document.querySelector('.problem-modal-window');
        const problemWindowContent = document.querySelector('.problem-window-content');

        const response = await fetch('http://localhost:3000/getproblems', {
            method: 'GET'
        });
        const data = await response.json();

        if (data) {
            overlay ? overlay.classList.add('show') : null;
            problemModalWindow ? problemModalWindow.style.display = 'block' : null;
            problemWindowContent.innerHTML = JSON.stringify(data, null, 2);  
        } else {
            overlay ? overlay.classList.remove('show') : null;
        }

        problemModalCloseButton.addEventListener('click', () => {
            overlay ? overlay.classList.remove('show') : null;
            problemModalWindow ? problemModalWindow.style.display = 'none' : null;
        });

        console.log(data);
    });
};

// добавление проблемы автомобилю
if (addProblemToCarButton) {
    addProblemToCarButton.addEventListener('click', async () => {
        const car_id = document.querySelector('.add-problem-to-car-carid-input').value;
        const problem_id = document.querySelector('.add-problem-to-car-problemid-input').value;

        const response = await fetch('http://localhost:3000/addproblemtocar', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({car_id, problem_id})
        });
        const data = await response.json();

        console.log(data);
    });
};
// загрузка фотографии
if (uploadImageButton) {
    uploadImageButton.addEventListener('click', async () => {
        const imageInput = document.querySelector('.add-image-input');

        const image = imageInput.files[0];
        const carId = document.querySelector('.car-id-input').value;
        const carModelName = document.querySelector('.car-model-name').value;

        const formData = new FormData();
        formData.append('image', image);
        formData.append('carId', carId);
        formData.append('carModelName', carModelName);

        // интересно, что выводится в консоль
        console.log(image, carId, carModelName);

        const response = await fetch('http://localhost:3000/uploadimage', {
            method: 'POST',
            // headers: {
            //     'Content-type': 'multipart/form-data'
            // },
            body: formData
        })
        
        const data = await response.json();

        // console.log(data);
    });
};
