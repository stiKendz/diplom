import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/MainPage.css'

export default function MainPageContent() {

    return(
        <main>
            <div className="main-container">
                <section className="preview-filters">
                    <h1 className="hello-user">Добро пожаловать</h1>
                    <p className="user-message">
                        Приложение позволяет подобрать автомобиль по желаемым параметрам: цена, 
                        тип кузова, объём двигателя, коробка передач и другие характеристики. 
                    </p>
                </section>
                <section className="filters-section">
                    <div className="filter car-concern">
                        <p className="filter-description car-concern">Выберете концерн, который вы предпочитаете</p>
                        <div className="filter-items car-concern">
                            <div className="filter-item car-concern-1">VAG</div>
                            <div className="filter-item car-concern-2">Toyota Motors</div>
                            <div className="filter-item car-concern-3">PSA</div>
                        </div>
                    </div>
                    <div className="filter car-brand">
                        <p className="filter-description car-brand">Выберете марку концерна</p>
                        <div className="filter-items car-brand">
                            <div className="filter-item car-brand-1">Audi</div>
                            <div className="filter-item car-brand-2">Lexus</div>
                            <div className="filter-item car-brand-3">Peugeot</div>
                        </div>
                    </div>
                    <div className="filter car-year">
                        <p className="filter-description car-year">Выберете годы выпуска автомобиля</p>
                        <div className="filter-items car-year">
                            <div className="filter-item car-year-1">1990-1994</div>
                            <div className="filter-item car-year-2">1995-1999</div>
                            <div className="filter-item car-year-3">2000-2004</div>
                        </div>
                    </div>
                    <div className="filter car-vehicle">
                        <p className="filter-description car-vehicle">Привод автомобиля</p>
                        <div className="filter-items car-vehicle">
                            <div className="filter-item car-vehicle-1">RWD</div>
                            <div className="filter-item car-vehicle-2">FWD</div>
                            <div className="filter-item car-vehicle-3">AWD</div>
                        </div>
                    </div>
                </section>
            </div>
        </main>   
    )
}