import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './AddProblemToCar.css'

export default function AddProblemToCar() {
    const [car_id, SetCarId] = useState('');
    const [problem_id, SetCProblemId] = useState('');

    async function AddProblemToSpeciousCar() {
        const response = await fetch('http://localhost:3000/addproblemtocar', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({car_id, problem_id})
        });
        const data = await response.json();

        console.log(data);
    }

    return (
        <>
            <div className="car-promlems-container">
                <h2>Добавление проблемы автомобилю</h2>
                <div className="car-problems-window">
                    <input type="number" className="add-problem-to-car-carid-input" placeholder="Введите ID автомобиля" 
                        onChange={e => SetCarId(e.target.value)}
                    />
                    <input type="number" className="add-problem-to-car-problemid-input" placeholder="Введите ID проблемы" 
                        onChange={e => SetCProblemId(e.target.value)}
                    />
                    <button type="button" className="add-problem-to-car-button" onClick={AddProblemToSpeciousCar}>Добавить проблему</button>
                </div>
            </div>
        </>
    )
} 