import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/Header.css'

import logo from '../../images/check-engine.jpg'

export default function Header() {
    return (
        <header>
            <div className="main">
                <img className="logo-png" src={logo}/>
                <h1 className="company-name">Check Engine</h1>
                <nav className="navigation-container">
                    <button type="button" className="to-sing-in-page">Войти</button>
                    <button type="button" className="to-sing-up-page">Зарегистрироваться</button>
                    <button type="button" className="to-user-cars-page">Мои машины</button>
                </nav>
            </div>
        </header>
    )
}