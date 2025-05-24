import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import './styles/AboutApp.css';

import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import downArrow from '../../images/down-arrow.png';

export default function AboutApp() {
    const navigate = useNavigate();

    return(
        <>
            <div className="main-container">  
                <Header />
                <div className="about-app-container">
                    <div className="about-app-card">
                        <h1 className="short-us">
                            Коротко о приложении
                        </h1>
                        <h2 className="short-text">
                            Приложение позволяет подобрать автомобиль по заданным фильтрам, и предоставляет информацию о них.
                        </h2>
                    </div>
                    <div className="steps-card">
                        <h2 className="steps-title">Как начать пользоваться?</h2>
                        <div className="steps-list">
                            <h2 className="registration">Регистрация</h2>
                            <div className="registration-description">
                                Перед использованием приложения вам необходимо зарегистрироваться.
                                Вернитесь на главную страницу, и нажмите на <span>"Зарегистрироваться"</span>.
                            </div>
                            <img className="next-arrow" src={downArrow}></img>
                            <h2 className="auth">Вход</h2>
                            <div className="auth-description">
                                После успешной регистрации, на главной странице нажмите на <span>"Войти"</span>.
                            </div>
                            <img className="next-arrow" src={downArrow}></img>
                            <h2 className="use">Использование</h2>
                            <div className="use-description">
                                Ура, вы получили доступ ко всем функциям приложения! 
                                Теперь вы можете пользоваться фильтрами для выбора автомобиля.
                                Вам доступен профиль и избранное.
                                Подбирайте и изучайте!
                            </div>
                        </div>
                    </div>
                    <div className="admin-card">
                        <h2 className="admin-title">Если вы администратор</h2>
                        <div className="admin-list">
                            <h2 className="for-admin">Зарегистрируйтесь и войдите</h2>
                            <div className="for-admin-description">
                                Как и обычному пользователю, вам нужно зарегистрироваться и войти в аккаунт для использования приложения.
                                После прохождения этих этапов вам откроется доступ к приложению, и функциям администратора.
                            </div>
                        </div>
                    </div>
                </div>
   
                <Outlet />
                <Footer />
            </div>
        </>
    )
}