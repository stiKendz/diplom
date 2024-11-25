const singUpButton = document.querySelector('.sing-up-button');
const singInButton = document.querySelector('.sing-in-button');

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

    if (token) {
        const singInWindow = document.querySelector('.sing-in-window-container');
        singInWindow ? singInWindow.style.display = 'none' : null;

        logOutButton ? logOutButton.style.display = 'block' : null;
    } else {
        logOutButton ? logOutButton.style.display = 'none' : null;
        console.log('пользователь не авторизован');
    }
};

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
            if (window.localStorage.getItem('token')){          
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

window.addEventListener('DOMContentLoaded', checkAdmin);
window.addEventListener('DOMContentLoaded', checkAutorize);
