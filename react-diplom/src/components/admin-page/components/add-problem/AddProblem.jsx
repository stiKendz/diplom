import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/AddProblem.css';

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

        if (data.emptyInputsMessage) {
            alert('Все поля должны быть заполнены')
        }
        if (data.duplicateProblemMessage) {
            alert('В базе данных уже существует такая проблема')
        }
        if (data.successAddProblem) {
            alert(`Проблема с названием ${data.problemName} - добавлена. ID проблемы: ${data.problemId}`)
        }

        console.log(data);
    }

    async function DeleteCarProblem() {
        const response = await fetch('http://localhost:3000/deleteproblem', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({problem_name})
        });
        const data = await response.json();

        if (data.emptyInputMessage) {
            alert('Введите название проблемы для её удаления')
        }
        if (data.noProblemInDb) {
            alert('Проблемы с таким названием не существует в базе данных')
        }
        if (data.successDeleteProblem) {
            alert(`Проблема с названием ${data.problemName} - удалена. ID проблемы: ${data.problemId}`)
        }

        console.log(data);
    }
    
    return(
        <>
            <div className="add-problem-container">
                <div className="add-problem-window">
                    <h2>Добавление проблемы автомобиля</h2>
                    <div className="problem-parameter name">
                        <p>Пример: гнилые пороги</p>
                        <input type="text" className="problem-name-input" placeholder="Название проблемы"  
                            onChange={e => SetCarProblemName(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter description">
                        <textarea type="text" className="problem-description-textarea" placeholder="Краткое описание проблемы" 
                            onChange={e => SetCarProblemShortDescription(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter difficult">
                        <input type="number" className="problem-difficult-input" placeholder="Сложность устранения (от 1 до 5)" 
                            onChange={e => SetCarProblemDiffucult(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter how-to-fixed">
                        <p>Пример: Обратиться в автосервис ...</p>
                        <textarea type="text" className="problem-how-to-fixed-textarea" placeholder=" Описание решения проблемы" 
                            onChange={e => SetCarProblemFixedWays(e.target.value)}
                        />
                    </div>
                    <div className="problem-parameter price">
                        <p>Пример: 100000</p>
                        <input type="text" className="problem-price-input" placeholder="Цена решения проблемы (тыс.руб)" 
                            onChange={e => SetCarProblemRepairPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button type="button" className="add-problem-button delete" onClick={DeleteCarProblem}>Удалить проблему</button>
                <button type="button" className="add-problem-button" onClick={AddCarProblem}>Добавить проблему</button>
            </div>
        </>
    )
}