import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import CarFullInfo from '../car-full-info/CarFullInfo';

export default function CarCard() {
    

    return(
        <>
            <div className="car-card">
                <p className=''><i>Карточка автомобиля</i></p>
                <img className='car-image'/>
                <div className="brand">Honda</div>
                <div className="model-name">dc2</div>
                <div className="generation">Поколение авто: 2</div>
                <div className="vehical">FWD</div>
                <div className="gearbox">Mecanical</div>
                <div className="body-type">Sedan</div>
                <div className="release-date">2001</div>
                <div className="end-release-date">2004</div>
                <div className="price">400.000 - 1.200.000</div>
                <div className="buttons-container">
                    <button className='add-to-favorite'>Добавить в избранное</button>
                    <button className='delete-from-favorite'>Удалить из избранного</button>
                    <button className='open-full-info'>Страница автомобиля</button>
                    <CarFullInfo />
                </div>
            </div>
        </>
    )
}