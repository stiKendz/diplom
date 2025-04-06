import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import CarCard from '../cars/car-card/CarCard';

export default function FavoriteCars() {
    return(
        <>
            <h2>Любимые автомобили</h2>
            <div className='favorite-cards-container'>
                <h2>Тест карточки автомобиля</h2>
                <CarCard />
            </div>
        </>
    )
}