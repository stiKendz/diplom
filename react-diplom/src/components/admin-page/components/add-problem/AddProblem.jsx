import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

export default function AddCar(){
    const [problem_name, SetCarProblemName] = useState('');
    const [problem_short_description, SetCarProblemShortDescription] = useState('');
    const [difficult, SetCarProblemDiffucult] = useState('');
    const [how_to_fixed, SetCarProblemFixedWays] = useState('');
    const [problem_price, SetCarProblemRepairPrice] = useState('');
    
    async function AddCarProblem() {
        const response = await fetch('http://localhost:3000/addproblem', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({problem_name, problem_short_description, difficult, how_to_fixed, problem_price})
        });
        const data = await response.json();

        console.log(data);
    }
    
    return(
        <>
            <div className="add-problem-container">
                <h2>Добавление проблемы автомобиля</h2>
                <div className="add-problem-window">
                    <div className="problem-parameter name">
                        <p>пример: гнилые пороги</p>
                        <input type="text" className="problem-name-input" placeholder="Название проблемы"  
                            onChange={e => SetCarProblemName(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter description">
                        <input type="text" className="problem-description-input" placeholder="Краткое описание проблемы" 
                            onChange={e => SetCarProblemShortDescription(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter difficult">
                        <input type="number" className="problem-difficult-input" placeholder="Сложность устранения (от 1 до 5)" 
                            onChange={e => SetCarProblemDiffucult(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter how-to-fixed">
                        <p>Обратиться в автосервис ...</p>
                        <input type="text" className="problem-how-to-fixed-input" placeholder=" Описание решения проблемы" 
                            onChange={e => SetCarProblemFixedWays(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter price">
                        <p>пример: 100.000тыс.руб</p>
                        <input type="text" className="problem-price-input" placeholder="Цена решения проблемы (тыс.руб)" 
                            onChange={e => SetCarProblemRepairPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button type="button" className="add-problem-button" onClick={AddCarProblem}>Добавить проблему</button>
            </div>
        </>
    )
}