import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/SingUpStyle.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function SingUp() {
    const [name, setUserName] = useState('');
    const [surname, setUserSurname] = useState('');
    const [password, setUserPassword] = useState('');
    const [email, setUserEmail] = useState('');

    async function UserSingUp() {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, surname, password, email }),
        });
    
        const data = await response.json();

        console.log(data);
    }

    return(
        <>
            <Header />
            <main className="singup">
                <div className="main-container-singup">
                    <div className="sing-up-window-container">
                        <div className="sing-up-window">
                            <input type="text" className="name-input" placeholder="Введите имя" autoComplete="off" onChange={e => setUserName(e.target.value)}/>
                            <input type="text" className="surname-input" placeholder="Введите фамилию" autoComplete="off" onChange={e => setUserSurname(e.target.value)}/>
                            <input type="text" className="email-input" placeholder="Введите адрес электронной почты" autoComplete="off" onChange={e => setUserEmail(e.target.value)}/>
                            <input type="text" className="password-input" placeholder="Придумайте пароль" autoComplete="off" onChange={e => setUserPassword(e.target.value)}/>
                            <button type="button" className="sing-up-button" onClick={UserSingUp}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}