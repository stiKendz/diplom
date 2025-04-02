import { StrictMode } from 'react'
import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import Header from './components/header/Header'
import MainPageContent from './components/page-content/main-page-content/MainPageContent'
import Footer from './components/footer/Footer'

import SingIn from './components/sing-in/SingIn'
import SingUp from './components/sing-up/SingUp'

import AdminPage from './components/admin-page/AdminPage';

import Handler from './scripts/app/handler';

export default function App() {
    return(
        <>
            <StrictMode>
                <Header />
                <MainPageContent />
                <Footer />  
                <SingIn />
                <SingUp />
                <AdminPage />
            </StrictMode>,
        </>
    )
} 