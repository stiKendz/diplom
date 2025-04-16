import { StrictMode } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import MainPageContent from './components/page-content/MainPageContent'
import SingIn from './components/sing-in/SingIn'
import SingUp from './components/sing-up/SingUp'
import AdminPage from './components/admin-page/AdminPage';
import Profile from './components/profile/Profile';
import AboutApp from './components/about-app/AboutApp';

import Handler from './scripts/app/handler';

export default function App() {
    return(
        <>
            <StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route 
                            path="/" 
                            element={<MainPageContent />}
                        />
                        <Route 
                            path="sing-in" 
                            element={<SingIn />}
                        />
                        <Route 
                            path="sing-up" 
                            element={<SingUp />}
                        />
                        <Route 
                            path="profile" 
                            element={<Profile />}
                        />
                        <Route 
                            path="admin" 
                            element={<AdminPage />}
                        />
                        <Route 
                            path="about-app"
                            element={<AboutApp></AboutApp>}
                        />
                    </Routes>
                </BrowserRouter>
            </StrictMode>,
        </>
    )
} 