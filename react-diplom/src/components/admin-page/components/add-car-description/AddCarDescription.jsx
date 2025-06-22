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

        if (data.emptyInputsMessage) {
            alert('Все поля должны быть заполнены')
        }
        if (data.noCarInDb) {
            alert('В базе данных нет автомобиля с таким ID')
        }
        if (data.duplicateDescriptionMessage) {
            alert('В базе данных уже есть краткое описание автомобиля с таким ID')
        }
        if (data.successAddDescription) {
            alert(`Автомобилю с ID ${data.carId}, добавлено описание ${data.carDescription}`)
        }

        console.log(data); 
    }

    async function DeleteCarDescription() {
        const response = await fetch('http://localhost:3000/deletecardescription', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({car_id})
        });
        const data = await response.json();

        if (data.emptyInputsMessage) {
            alert('Поле с ID автомобиля должно быть заполнено');
        }
        if (data.noCarDescriptionInDb) {
            alert('В базе данных не существует такого автомобиля и его описания');
        }
        if (data.seccessDeleteCarDescription) {
            alert(`Описание автомобиля с ID:${data.carId} - удалено`);
        }

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
                <button type="button" className="add-description-button delete" onClick={DeleteCarDescription}>Удалить описание</button>
                <button type="button" className="add-description-button" onClick={AddCarDescription}>Добавить описание</button>
            </div>
        </>
    )
}

