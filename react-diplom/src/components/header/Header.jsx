import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/Header.css'

export default function Header() {
    return (
        <header>
            <div className="header-container main">
                <img className="logo-png" />
                <h1 className="company-name">Подбор автомобиля</h1>
                <nav className="navigation-container">
                    <button type="button" className="to-sing-in-page">Войти</button>
                    <button type="button" className="to-sing-up-page">Зарегистрироваться</button>
                    <button type="button" className="to-user-cars-page">Мои машины</button>
                </nav>
            </div>
        </header>
    )
}