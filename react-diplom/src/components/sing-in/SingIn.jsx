import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/SingInStyle.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function SingIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function UserSingIn() {
        try {
            const data = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json());


            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('email', data.email);
            window.localStorage.setItem('role', data.role);

            console.log(data);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }

    const logOut = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('role');
    
        alert('Вы вышли из аккаунта');
    }
        
    return(
        <>
            <Header />
            <main className="singin">
                <div className="main-container-singin">
                    <div className="sing-in-window-container">
                        <div className="sing-in-window">
                            <input type="email" className="email-input" placeholder="Введите адрес электронной почты" onChange={e => setEmail(e.target.value)}/>
                            <input type="text" className="password-input" placeholder="Введите пароль" onChange={e => setPassword(e.target.value)}/>
                            <button type="button" className="sing-in-button" onClick={UserSingIn}>Войти</button>
                        </div>
                    </div>
                    <div className="log-out-window-container">
                        <div className="log-out-window">
                            <button type="button" className="log-out-button" onClick={logOut}>Выйти из аккаунта</button>
                        </div>
                    </div>
                </div>
            </main>  
            <Footer />
        </>
    )
}