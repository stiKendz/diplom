import React from 'react';
import { createContext } from 'react';
import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import CarFullInfo from '../car-full-info/CarFullInfo';
import './styles/CarCard.css';

import dc2 from '../../../images/dc2.jpg';

export default function CarCard() {
    const navigate = useNavigate();

    return(
         <>
             <div className="car-card">
                 <div className="car-info">
                     <img className='car-image' src={dc2}/>
                     <div className="brand">Honda</div>
                     <div className="model-name">Модель</div>
                     <div className="generation">Поколение авто:</div>
                     <div className="vehical">Привод</div>
                     <div className="gearbox">Тип КПП</div>
                     <div className="body-type">Тип кузова</div>
                     <div className="release-date">Старт производства: 2001</div>
                     <div className="end-release-date">Окончание производства: 2004</div>
                     <div className="price">400.000.руб - 1.200.000.руб</div>
                 </div>
                 <div className="buttons-container">
                     <button className='add-to-favorite'>Добавить в избранное</button>
                     <button className='delete-from-favorite'>Удалить из избранного</button>
                     <button className='open-full-info'
                         onClick={() => navigate('car-full-info', {replace:false})}
                     >
                         Страница автомобиля
                     </button>
                 </div>
             </div>
             <Outlet />
         </>
    )
}