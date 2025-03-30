import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/SingInStyle.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function SingIn() {
    async function UserSingIn() {
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
    }
        
    return(
        <>
            <Header />
            <main className="singin">
                <div className="main-container-singin">
                    <div className="sing-in-window-container">
                        <div className="sing-in-window">
                            <input type="text" className="password-input" placeholder="Введите пароль" />
                            <input type="email" className="email-input" placeholder="Введите адрес электронной почты" />
                            <button type="button" className="sing-in-button" onClick={UserSingIn}>Войти</button>
                        </div>
                    </div>
                    <div className="log-out-window-container">
                        <div className="log-out-window">
                            <button type="button" className="log-out-button">Выйти из аккаунта</button>
                        </div>
                    </div>
                </div>
            </main>  
            <Footer />
        </>
    )
}