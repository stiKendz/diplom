import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/SingUpStyle.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function SingUp() {
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userPassword, setUserpassword] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const user = {
        name: '',
        surname: '',
        password: '',
        email: ''
    }
    async function UserSingUp() {

    
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, surname, password, email }),
        });
    
        const data = await response.json();
        data === true ? alert('Вы успешно зарегистрировались') : alert('Ошибка при регистрации');

        console.log(data);
    }

    return(
        <>
            <Header />
            <main className="singup">
                <div className="main-container-singup">
                    <div className="sing-up-window-container">
                        <div className="sing-up-window">
                            <input type="text" className="name-input" placeholder="Введите имя" autoComplete="off" />
                            <input type="text" className="surname-input" placeholder="Введите фамилию" autoComplete="off" />
                            <input type="text" className="email-input" placeholder="Введите адрес электронной почты" autoComplete="off" />
                            <input type="text" className="password-input" placeholder="Придумайте пароль" autoComplete="off" />
                            <button type="button" className="sing-up-button" onClick={UserSingUp}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}