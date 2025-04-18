import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import './styles/AboutApp.css';

import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function AboutApp() {
    const navigate = useNavigate();

    return(
        <>
            <main>
                <Header />
                    <div className="about-app-container">
                        <button type="button" className="back-button"
                            onClick={() => navigate('/', {replace: false})}
                        >
                            На главную
                        </button>
                        <h1>Страница, где будет описываться что это за приложение и как им пользоваться. Последее неточно</h1>
                    </div>
                <Outlet />
                <Footer />
            </main>
        </>
    )
}