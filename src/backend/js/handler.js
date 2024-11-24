const singUpButton = document.querySelector('.sing-up-button');
const singInButton = document.querySelector('.sing-in-button');
// кнопка для перехода на страницу администратора
// небъяснимая пока что ошибка -- при adminPageButton ругается на первую строку файла, и говорит что такая переменная уже существует
// при других значениях все работает исправно
const adminPageBtn = document.querySelector('.admin-page-button');
adminPageBtn.style.display = 'none';

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

            // админ или нет? обработка
            if (data.role === 'admin') {
                adminPageBtn.style.display = 'block';
                alert('Вы вошли как администратор');
            } else if (data.role === 'user'){
                adminPageBtn.style.display = 'none';
                alert('Добро пожаловать !');
            } else {
                alert('Неверный логин или пароль');
            };

            if (window.localStorage.getItem(data.token)){
                const singInWindow = document.querySelector('.sing-in-window-container');
                singInWindow.style.display = 'none';
            } else {
                console.log('не авторизован');
            }

            console.log(data);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    });
};