import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './UpdateAndDeleteCar.css'

export default function UpdateAndDeleteCars() {
    return(
        <>
            <div className="delete-update-cars-container">
                <UpdateCar />
                <DeleteCar />
            </div>
        </>
    )
}

export function UpdateCar() {
    const [car_id, SetCarId] = useState();
    const [model_number, SetModelNumber] = useState();

    async function UpdateChangedCar() {
        const result = await fetch('http://localhost:3000/updatemodel', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({car_id, model_number})
        });
        const data = await result.json();

        console.log(data);
    }

    return(
        <>
            <div className="update-car-container">
                <div className="update-car-container-items">
                    <h2>Обновление модели автомобиля</h2>
                    <div className="update-cars">
                        <input type="number" className="update-id-input" placeholder="Введите ID автомобиля" 
                            onChange={e => SetCarId(e.target.value)}
                        />
                        <p>Пример: DC5, GC8, 8B </p>
                        <input type="text" className="update-model-name-input" placeholder="Введите новый номер модели" 
                            onChange={e => SetModelNumber(e.target.value)}
                        />
                        
                    </div>
                </div>
                <button type="button" className="update-car-button" onClick={UpdateChangedCar}>Изменить модель</button>
            </div>
        </>
    )
}

export function DeleteCar() {
    const [car_id, SetCarId] = useState();

    async function DeleteChangedCar() {
        const response = await fetch('http://localhost:3000/deletecar', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({car_id})
        })
        const data = await response.json();

        console.log(data);
    }

    return(
        <>
            <div className="delete-car-container">
                <div className="delete-car-container-items">
                    <h2>Удаление автомобиля</h2>
                    <div className="delete-cars">
                        <input type="number" className="delete-car-input-id" placeholder="Введите ID автомобиля" 
                            onChange={e => SetCarId(e.target.value)}
                        />
                    </div>
                </div>
                <button 
                    type="button" 
                    className="delete-car-button" 
                    onClick={DeleteChangedCar}>
                    Удалить автомобиль
                </button>
            </div>
        </>
    )
}