import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import { BrowserRouter, Outlet, useNavigate } from 'react-router-dom';

import './styles/Profile.css';

import Header from '../header/Header';
import FavoriteCars from './FavoriteCars';
import Footer from '../footer/Footer';

export default function Profile() {
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
                                <p className='name'>Имя пользователя</p>
                                <button className='change-data'>Изменить данные</button>
                                <ChangeData />
                            </div>
                            <div className="senondname-container">
                                <p className='surname'>Фамилия пользователя</p>
                                <button className='change-data'>Изменить данные</button>
                                <ChangeData />
                            </div>
                            <div className="phone-container">
                                <p className='phone-number'>Номер телефона пользователя</p>
                                <button className='change-data'>Изменить данные</button>
                                <ChangeData />
                            </div>
                            <div className="email-container">
                                <p className='email'>Электронная почта пользователя</p>
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