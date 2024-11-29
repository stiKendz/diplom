const singUpButton = document.querySelector('.sing-up-button');
const singInButton = document.querySelector('.sing-in-button');
const logOutButton = document.querySelector('.log-out-button');
const addEngineButton = document.querySelector('.add-engine-button');
const showEnginesButton = document.querySelector('.show-engines-button');
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
        }

        engineModalCloseButton.addEventListener('click', () => {
            engineModalWindow ? engineModalWindow.style.display = 'none' : null;
            overlay ? overlay.classList.remove('show') : null;
        });

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
