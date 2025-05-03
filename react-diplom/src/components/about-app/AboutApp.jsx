import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import './styles/AboutApp.css'

import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function AboutApp() {
    const navigate = useNavigate();

    return(
        <>
            <div className="main-container">  
                <Header />
                <div className="about-app-container">
                    <div className="about-app-card">
                        <h1>
                            Приложение позволяет быстро находить автомобили по заданным параметрам с
                            помощью интеллектуальной системы фильтров. 
                            Вы можете детально изучать каждую модель через карточки с фотографиями,
                            техническими характеристиками и историями владельцев.
                        </h1>
                    </div>
                </div>
                <Outlet />
                <Footer />
            </div>
        </>
    )
}