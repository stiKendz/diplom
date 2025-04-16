import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './styles/Header.css'

import logo from '../../images/check-engine.jpg'

import AboutApp from '../about-app/AboutApp';

import { TokenContext } from '../contexts/TokenContext';
import { RoleContext } from '../contexts/RoleContext';

export default function Header() {
    const tokenAllowed = useContext(TokenContext);
    const [token, getToken] = useState(() => window.localStorage.getItem('token'));
    const [role, getRole] = useState(() => window.localStorage.getItem('role'));
    const navigate = useNavigate();

    return (
        <header>
            <TokenContext.Provider value={getToken}>
                <RoleContext.Provider value={getRole}>
                    <div className="main">
                        <img className="logo-png" src={logo}/>
                        <h1 className="company-name">Check Engine</h1>
                        <nav className="navigation-container">
                            {
                                role === 'admin' && token ? (
                                    <>
                                        <button
                                            type="button" 
                                            className="profile-page"
                                            onClick={() => navigate('profile', {replace: false})}
                                        >Профиль</button>
                                        <button 
                                            type="button" 
                                            className="admin-page-button"
                                            onClick={() => navigate('admin', {replace: false})}
                                        >Страница администратора</button>
                                        <button type="button" className="about-page"
                                            onClick={() => navigate("about-app", {replace: false})}
                                        >
                                            Про приложение
                                        </button>
                                    </>

                                ) : role === 'user' && token ? (
                                    <>
                                        <button
                                            type="button" 
                                            className="profile-page"
                                            onClick={() => navigate('profile', {replace: false})}
                                        >Профиль</button>
                                        <button type="button" className="about-app"
                                            onClick={() => navigate("about-app", {replace: false})}
                                        >
                                            Про приложение
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className="about-app"
                                            onClick={() => navigate("about-app", {replace: false})}
                                        >
                                            Про приложение
                                        </button>
                                    </>
                                )
                            }
                        </nav>
                    </div>
                    <Outlet />
                </RoleContext.Provider>
            </TokenContext.Provider>
        </header>
    )
}