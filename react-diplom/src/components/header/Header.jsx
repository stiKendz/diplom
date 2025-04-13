import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/Header.css'

import logo from '../../images/check-engine.jpg'

import { TokenContext } from '../contexts/TokenContext';

export default function Header() {
    const tokenAllowed = useContext(TokenContext);
    const [token, getToken] = useState(() => window.localStorage.getItem('token'));

    return (
        <header>
            <TokenContext.Provider value={getToken}>
                <div className="main">
                    <img className="logo-png" src={logo}/>
                    <h1 className="company-name">Check Engine</h1>
                    <nav className="navigation-container">
                        {
                            token ? (
                                <button type="button" className="to-user-cars-page">Мои машины</button>
                            ) : (
                            <>
                                <button type="button" className="to-sing-in-page">Войти</button>
                                <button type="button" className="to-sing-up-page">Зарегистрироваться</button>
                            </>
                            )
                        }
                    </nav>
                </div>
            </TokenContext.Provider>
        </header>
    )
}