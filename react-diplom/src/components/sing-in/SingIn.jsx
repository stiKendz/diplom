import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './styles/SingInStyle.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function SingIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function UserSingIn() {
        try {
            const data = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            
            if (data.ok) {
                const response = await data.json();

                alert('Вы успешно вошли в аккаунт')
                
                window.localStorage.setItem('token', response.token);
                window.localStorage.setItem('email', response.email);
                window.localStorage.setItem('role', response.role);
            } else if (email === '' || password === '') {
                alert('Все поля должны быть заполнены')
            } else {
                alert('Неверный логин или пароль')
            }

            console.log(data);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            alert('Возникла ошибка при выполнении запроса')
        }
    }
        
    return(
        <>
            <Header />
            <main className="singin">
                <div className="main-container-singin">
                    <div className="sing-in-window-container">
                        <div className="sing-in-window">
                            <input type="email" className="email-input" placeholder="Введите адрес электронной почты" onChange={e => setEmail(e.target.value)}/>
                            <input type="password" className="password-input" placeholder="Введите пароль" onChange={e => setPassword(e.target.value)}/>
                            <button type="button" className="sing-in-button" onClick={UserSingIn}>Войти</button>
                        </div>
                    </div>
                </div>
            </main>  
            <Outlet />
            <Footer />
        </>
    )
}