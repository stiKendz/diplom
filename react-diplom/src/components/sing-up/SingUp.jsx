import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './styles/SingUpStyle.css';
import Footer from '../footer/Footer';
import Header from '../header/Header';

import CarCard from '../cars/car-card/CarCard';

export default function SingUp() {
    const [name, setUserName] = useState('');
    const [surname, setUserSurname] = useState('');
    const [password, setUserPassword] = useState('');
    const [email, setUserEmail] = useState('');
    const navigate = useNavigate();

    async function UserSingUp() {
        const data = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, surname, password, email }),
        });
        
        try {
            if (data.ok) {
                const response = await data.json();
                alert("Вы успешно зарегистрировались")
            } else if (name === '' || surname === '' || password === '' || email === '') {
                alert("Все поля должны быть заполнены")
            } else {
                alert('Некоректные данные для регистрации')
            }

            console.log(data)
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            alert('Возникла ошибка при выполнении запроса')
        }
    }

    return(
        <>
            <Header />
            <main className="singup">
                <div className="main-container-singup">
                    {/* <button type="button" className='back-button'
                        onClick={() => navigate('/', {replace: false})}
                    >
                        На главную
                    </button> */}
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
            <CarCard />
        </>
    )
}