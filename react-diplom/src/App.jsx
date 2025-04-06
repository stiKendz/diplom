import { StrictMode } from 'react'
import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import MainPageContent from './components/page-content/MainPageContent'
import SingIn from './components/sing-in/SingIn'
import SingUp from './components/sing-up/SingUp'
import AdminPage from './components/admin-page/AdminPage';
import Profile from './components/profile/Profile';

import Handler from './scripts/app/handler';

export default function App() {
    return(
        <>
            <StrictMode>
                <MainPageContent />
                <SingIn />
                <SingUp />
                <AdminPage />
                <Profile />
            </StrictMode>,
        </>
    )
} 