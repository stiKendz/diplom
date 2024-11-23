// регистрация пользователя
const singUpButton = document.querySelector('.sing-up-button');
const singInButton = document.querySelector('.sing-in-button');
const addCarsButton = document.querySelector('.add-cars-button').style.display = 'none';

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
                alert('Вы вошли как администратор');
            } else if (data.role === 'user'){
                alert('Добро пожаловать !');
            } else {
                alert('Неверный логин или пароль');
            };

            console.log(data);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    });
};