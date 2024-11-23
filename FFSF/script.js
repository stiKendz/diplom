document.addEventListener('DOMContentLoaded', () => {
    const openAddImageModalButton = document.getElementById('openAddImageModal');
    const addImageModal = document.getElementById('addImageModal');
    const closeAddImageModalButton = document.getElementById('closeModal');

    const openAuthModalButtons = document.querySelectorAll('#openAuthModal, #openAuthModal2');
    const authModal = document.getElementById('authModal');
    const closeAuthModalButton = authModal.querySelector('.close');
    
    const registerModal = document.getElementById('registerModal');
    const toggleToRegisterButton = document.getElementById('toggleToRegister');
    const closeRegisterModalButton = registerModal.querySelector('.close');
    
    const imageBoard = document.getElementById('imageBoard');
    
    // Добавление изображения
    document.getElementById('addImageForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const imageUrl = document.getElementById('imageUrl').value;
        if (imageUrl) {
            const newCard = document.createElement('div');
            newCard.className = 'image-card';
            newCard.innerHTML = `
                <img src="${imageUrl}" alt="Добавленное изображение">
                <button class="saveBtn">Сохранить</button>
            `;
            imageBoard.appendChild(newCard);
            addImageModal.style.display = 'none'; // Закрыть модальное окно после добавления
            this.reset(); // Очистить форму
        }
    });

    // Открытие и закрытие модальных окон
    openAddImageModalButton.onclick = () => {
        addImageModal.style.display = 'block';
    };

    closeAddImageModalButton.onclick = () => {
        addImageModal.style.display = 'none';
    };

    openAuthModalButtons.forEach(button => {
        button.onclick = () => {
            authModal.style.display = 'block';
            registerModal.style.display = 'none'; // Закрыть окно регистрации при открытии входа
        };
    });

    closeAuthModalButton.onclick = () => {
        authModal.style.display = 'none';
    };

    toggleToRegisterButton.onclick = (e) => {
        e.preventDefault();
        authModal.style.display = 'none'; // Закрыть окно входа
        registerModal.style.display = 'block'; // Открыть окно регистрации
    };

    closeRegisterModalButton.onclick = () => {
        registerModal.style.display = 'none';
    };

    // // Простой фейковый вход и регистрация
    // document.getElementById('authForm').addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     const username = document.getElementById('username').value;
    //     const password = document.getElementById('password').value;

    //     if (username && password) {
    //         // Логика проверки данных
    //         alert(`Вход как: ${username}`);
    //         authModal.style.display = 'none';
    //     } else {
    //         alert('Пожалуйста, заполните все поля.');
    //     }
    // });

    document.getElementById('submitRegistration').addEventListener('click', async function(event) {
        event.preventDefault();
        const regUsername = document.getElementById('regUsername').value;
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;

        
        if (regUsername && regEmail && regPassword) {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: regUsername,
                    email: regEmail,
                    password: regPassword
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                alert(`Вы успешно зарегистрировались под именем ${regUsername}`);
                registerModal.style.display = 'none';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });
    
    // Пример с использованием fetch API для входа
    document.getElementById('authForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        if (username && password) {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                authModal.style.display = 'none';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });

    // Закрытие модальных окон при нажатии вне их
    window.onclick = function(event) {
        if (event.target == addImageModal || event.target == authModal || event.target == registerModal) {
            addImageModal.style.display = 'none';
            authModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    };
}); 