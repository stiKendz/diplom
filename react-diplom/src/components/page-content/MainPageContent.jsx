import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import './styles/MainPageContent.css'

import dcImage from '../../images/dc2.jpg'

export default function MainPageContent() {
    return(
        <div className="main-page">
            <Header />
            <div className="main-container">
                <section className="hello-card">
                    <p className="hello-message">Сделайте правильный выбор в мире автомобилей</p>
                    <p className="information-message"> 
                        <span> Войдите </span> 
                        или 
                        <span> зарегистрируйтесь </span>
                        для использования приложения
                    </p>
                </section>
                <section className="filters-container">
                    <Filter id="concern"/>
                    <Filter id="car"/>
                    <Filter id="model"/>
                </section>
            </div>
            <Footer />
        </div> 
    )
}


function Filter({id=''}) {
    return(
        <>
            <div className="filter" id={id}>
                <img id={id} src={dcImage}></img>
                <p className="description" id={id}>Выберете концерн, который вы предпочитаете</p>
                <div className="items" id={id}>
                    <div className="item" id={id}>VAG</div>
                    <div className="item" id={id}>Toyota Motors</div>
                    <div className="item" id={id}>PSA</div>
                </div>
                <div className="text-addition" id={id}>
                    <p className='big-addition' id={id}>
                        Этот фильтр помогает выбрать автомобиль из конкретной группы компаний-производителей
                    </p>
                    <p className='small-addition' id={id}>
                        VAG (Volkswagen Group) — немецкий концерн, включающий марки: Volkswagen, Audi, Skoda, Seat, Porsche и другие
                        Toyota Motors — японский производитель, включающий марки: Toyota, Lexus, Daihatsu
                        PSA (Stellantis) — европейский концерн, включающий марки: Peugeot, Citroën, Opel, DS
                    </p>
                </div>
            </div>
        </>
    )
}