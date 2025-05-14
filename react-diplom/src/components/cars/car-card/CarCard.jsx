import React from 'react';
import { createContext } from 'react';
import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import CarFullInfo from '../car-full-info/CarFullInfo';
import './styles/CarCard.css';

import dc2 from '../../../images/dc2.jpg';

export default function CarCard({
    brand, 
    model_name, 
    model_number,
    car_vehicle, 
    gearbox, 
    body_type, 
    release_date, 
    end_release_date, 
    price_start, 
    price_end
}) {
    const navigate = useNavigate();

    return(
         <>
             <div className="car-card">
                 <div className="car-info">
                     <img className='car-image' src={dc2}/>
                     <div className="brand">{brand}</div>
                     <div className="model-name">{model_name} - {model_number}</div>
                     {/* <div className="vehicle">Привод: {car_vehicle}</div>
                     <div className="gearbox">Тип КПП: {gearbox}</div>
                     <div className="body-type">Тип кузова: {body_type}</div> */}
                     <div className="release-date">Старт производства: {release_date}</div>
                     <div className="end-release-date">Окончание производства: {end_release_date}</div>
                     <div className="price">{price_start} - {price_end}</div>
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