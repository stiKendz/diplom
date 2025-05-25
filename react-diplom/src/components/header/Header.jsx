import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import { Link, Navigate, Outlet } from 'react-router-dom';
import { useNavigate , useLocation } from 'react-router-dom';

import './styles/Header.css'

import logo from '../../images/main-page-images/icons8-двигатель-100.png';

import AboutApp from '../about-app/AboutApp';

import { TokenContext } from '../contexts/TokenContext';
import { RoleContext } from '../contexts/RoleContext';

export default function Header() {
    const tokenAllowed = useContext(TokenContext);
    const [token, getToken] = useState(() => window.localStorage.getItem('token'));
    const [role, getRole] = useState(() => window.localStorage.getItem('role'));

    const navigate = useNavigate();
    let location = useLocation();

    return (
        <header>
            <TokenContext.Provider value={getToken}>
                <RoleContext.Provider value={getRole}>
                    <div className="main">
                        <img className="logo-png" src={logo}/>
                        <h1 className="company-name">Check Engine</h1>
                        <nav className="navigation-container">
                            {
                                role === 'admin' 
                                && token 
                                && location.pathname != '/profile' 
                                && location.pathname != '/admin' 
                                && location.pathname != '/about-app'
                                && location.pathname != '/car-full-info'
                                && location.pathname != '/profile/car-full-info'
                                ? (
                                    <>
                                        <button
                                            type="button" 
                                            className="profile-page"
                                            onClick={() => navigate('profile', {replace: false})}
                                        >
                                            Профиль</button>
                                        <button 
                                            type="button" 
                                            className="admin-page-button"
                                            onClick={() => navigate('admin', {replace: false})}
                                        >
                                            Страница администратора</button>
                                        <button type="button" className="about-page"
                                            onClick={() => navigate("about-app", {replace: false})}
                                        >
                                            Про приложение
                                        </button>
                                    </>

                                ) : role === 'user' 
                                && token 
                                && location.pathname != '/profile'
                                && location.pathname != '/about-app'
                                && location.pathname != '/car-full-info'
                                && location.pathname != '/profile/car-full-info'
                                ? (
                                    <>
                                        <button
                                            type="button" 
                                            className="profile-page"
                                            onClick={() => navigate('profile', {replace: false})}
                                        >
                                            Профиль</button>
                                        <button 
                                            type="button" 
                                            className="about-app"
                                            onClick={() => navigate('about-app', {replace: false})}
                                        >
                                            Про приложение
                                        </button>
                                    </>
                                ) : !token && !role && location.pathname == '/' ? (
                                    <>
                                        <button 
                                            type="button" 
                                            className="about-app"
                                            onClick={() => navigate('about-app', {replace: false})}
                                        >
                                            Про приложение
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="profile-page"
                                            onClick={() => navigate('/', {replace: false})}
                                        >
                                            На главную
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