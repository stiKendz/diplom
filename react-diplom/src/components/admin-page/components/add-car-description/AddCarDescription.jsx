import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/AddCarDescription.css'

export default function AddCar(){
    const [description, SetCarDescription] = useState('');
    const [car_id, SetCarIdInDescription] = useState('');

    async function AddCarDescription() {
        const response = await fetch('http://localhost:3000/addcardescription', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({description, car_id})
        });
        const data = await response.json();

        console.log(data); 
    }
    
    return(
        <>
            <div className="car-description-container">
                <div className="car-description-container-items">
                    <h2 className="car-decsription">Описание автомобиля</h2>
                    <textarea type="text" className="car-desription-area" placeholder="Краткое описание автомобиля"
                        onChange={e => SetCarDescription(e.target.value)}
                    />
                    <input type="number" className="car-description-id-input" placeholder="Введите ID автомобиля" 
                        onChange={e => SetCarIdInDescription(e.target.value)}
                    />
                </div>
                <button type="button" className="add-description-button delete">Удалить описание</button>
                <button type="button" className="add-description-button" onClick={AddCarDescription}>Добавить описание</button>
            </div>
        </>
    )
}

