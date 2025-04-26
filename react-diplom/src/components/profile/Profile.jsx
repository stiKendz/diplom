import React from 'react';
import { createContext } from 'react';
import {useState, useContext, useEffect} from 'react';

import { BrowserRouter, data, Outlet, useNavigate } from 'react-router-dom';

import './styles/Profile.css';

import Header from '../header/Header';
import FavoriteCars from './FavoriteCars';
import Footer from '../footer/Footer';

import { TokenContext } from '../contexts/TokenContext';

export default function Profile() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    // const [token, getToken] = useState(() => window.localStorage.getItem('token'));
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo(){
        const response = await fetch('http://localhost:3000/getuserinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const userData = await response.json();

        if(userData.userInfo) {
            const user = userData.userInfo;
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
            setPhoneNumber(user.phone_number)
        }
    }

    return(
        <main>
            <Header />
                <div className="user-profile-container">
                    <div className="user-info-card">
                        <h1>Информация о пользователе</h1>
                        <div className="profile-photo">
                            <img />
                        </div>
                        <div className="bio">
                            <div className="name-container">
                                <p className='name'>{name}</p>   
                                <button className='change-data'>Изменить данные</button>
                                <ChangeData />
                            </div>
                            <div className="senondname-container">
                                <p className='surname'>{surname}</p>
                                <button className='change-data'>Изменить данные</button>
                                <ChangeData />
                            </div>
                            <div className="email-container">
                                <p className='email'>{email}</p>
                                <button className='change-data'>Изменить данные</button>
                                <ChangeData />
                            </div>
                            <div className="phone-container">
                                <p className='phone-number'>{phone_number}</p>
                                <button className='change-data'>Изменить данные</button>
                                <ChangeData />
                            </div>
                        </div>
                    </div>
                    <div className="user-favorite-container">
                        <button type='button' className='open-favorite-cars'>Избранное</button>
                        <div className="user-favorite-cars">
                            <FavoriteCars />
                        </div>
                    </div>
                </div>
            <Footer />
        </main>
    )
}


function ChangeData() {
    return(
        <>
            <div className="change-data-container">
                <input type='text' className='new-data' defaultValue='Новые данные'></input>
                <button className='change-data'>Подтвердить</button>
            </div>
        </>
    )
}

// сделать контекст с данными о пользователе (контекст будет включать в себя массив с данными о пользователе из базы данных)