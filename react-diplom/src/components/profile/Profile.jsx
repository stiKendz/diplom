import React from 'react';
import { createContext } from 'react';
import {useState, useContext, useEffect} from 'react';

import { BrowserRouter, data, Outlet, useNavigate } from 'react-router-dom';

import './styles/Profile.css';

import Header from '../header/Header';
import FavoriteCars from './FavoriteCars';
import Footer from '../footer/Footer';

import { TokenContext } from '../contexts/TokenContext';

import noPhoto from '../../images/no-photos.png'

export default function Profile() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    // const [phone_number, setPhoneNumber] = useState('');
    // const [token, getToken] = useState(() => window.localStorage.getItem('token'));
    const token = window.localStorage.getItem('token');

    const navigate = useNavigate();

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
            // setPhoneNumber(user.phone_number)
        }
    }

    async function changeUserInfo() {
        const response = await fetch('http://localhost:3000/changeuserinfo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, surname, email})
        })

        const data = await response.json();

        if (data) {
            window.location.reload();
        }
    }

    async function LogoutFromAccount() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('role');
    
        alert('Вы вышли из аккаунта');

        navigate('/', {replace: false});
    }

    return(
        <main>
            <Header />
                <div className="user-profile-container">
                    <div className="user-info-card">
                        <h1>Информация о пользователе</h1>
                        <div className="profile-photo">
                            <img src={noPhoto}/>
                        </div>
                        <div className="bio">
                            <div className="name-container">
                                <p className='name'>Имя : {name}</p>   
                                <div className="change-data-container">
                                    <input type='text' className='new-data' placeholder='Новые данные'
                                        onChange={e => setName(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className="senondname-container">
                                <p className='surname'>Фамилия : {surname}</p>
                                <div className="change-data-container">
                                    <input type='text' className='new-data' placeholder='Новые данные'
                                        onChange={e => setSurname(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className="email-container">
                                <p className='email'>Электронная почта : {email}</p>
                                {/* <div className="change-data-container">
                                    <input type='text' className='new-data' placeholder='Новые данные'
                                        onChange={e => setEmail(e.target.value)}
                                    ></input>
                                </div> */}
                            </div>
                            {/* <div className="phone-container">
                                <p className='phone-number'>Номер телефона : {phone_number}</p>
                                <div className="change-data-container">
                                    <input type='text' className='new-data' placeholder='Новые данные'
                                        onChange={e => setPhoneNumber(e.target.value)}
                                    ></input>
                                </div>
                            </div> */}
                            <div className="buttons-container">
                                <button className='change-data'
                                    onClick={changeUserInfo}
                                >
                                    Подтвердить новые данные профиля
                                </button>
                                <button className='logout'
                                    onClick={LogoutFromAccount}
                                >
                                    Выйти из аккаунта
                                </button> 
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

// сделать контекст с данными о пользователе (контекст будет включать в себя массив с данными о пользователе из базы данных)