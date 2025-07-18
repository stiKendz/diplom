import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/AddEngine.css';

export default function AddEngine(){
    const [engine_serial_name, setEngineSerialName] = useState('');
    const [engine_size, SetEngineSize] = useState('');
    const [engine_type, SetEngineType] = useState('');
    const [engine_nano, SetEngineNano] = useState('');
    const [engine_horse_power, SetEngineHorsePower] = useState('');
    const [engine_expenditure_city, SetEngineExpenditureCity] = useState('');
    const [engine_expenditure_track, SetEngineExpenditureTrack] = useState('');
    const [camshaft_system, SetEngineCamshaftSystem] = useState('');

    async function AddEngine() {
        const response = await fetch('http://localhost:3000/addengine', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system})
        });
        const data = await response.json();

        if (data.emptyInputsMessage) {
            alert('Все поля должны быть заполнены')
        }
        if (data.duplicateEngineMessage) {
            alert('В базе данных уже существует такой двигатель')
        }
        if (data.successAddEngine) {
            alert('Двигатель добавлен')
        }

        console.log(data);
    }

    async function DeleteEngine() {
        const response = await fetch('http://localhost:3000/deleteengine', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({engine_serial_name})
        });

        const data = await response.json();
        if (data.emptyInputMessage) {
            alert('Поле с названием модели двигателя не может быть пустым')
        }
        if (data.noEngineInDb) {
            alert('В базе данных не существует такого двигателя')
        }
        if (data.seccessDeleteEngine) {
            alert('Двигатель удален')
        }

        console.log(data);
    }

    return(
        <>
            <div className="engine-add-container">
                <div className="engine-parameters-container">
                    <h2>Добавление двигателя</h2>
                    <div className="engine-parameter serial-name">
                        <p>Пример: ej20, 4g18</p>
                        <input type="text" className="serial-number-input" placeholder="Серийный номер двигателя:" 
                        onChange={e => setEngineSerialName(e.target.value)}
                        />
                    </div>
                    <div className="engine-parameter engine-size">
                        <p>Пример: 1.6, 2.0</p>
                        <input type="text" className="engine-size-input" placeholder="Объем :" 
                        onChange={e => SetEngineSize(e.target.value)}
                        />
                    </div>
                    <div className="engine-parameter engine-type">
                        <p>Пример: Рядный, Роторный</p>
                        <input type="text" className="engine-type-input" placeholder="Тип :" 
                        onChange={e => SetEngineType(e.target.value)}
                        />
                    </div>
                    <div className="engine-parameter engine-nano">
                        <p>Пример: 320nm, 240nm</p>
                        <input type="text" className="engine-nano-input" placeholder="Крутящий момент :" 
                        onChange={e => SetEngineNano(e.target.value)}
                        />
                    </div>
                    <div className="engine-parameter engine-horse-power">
                        <p>Пример: 240лс</p>
                        <input type="text" className="engine-horse-power-input" placeholder="Мощность л.с (лошадиные силы) :" 
                        onChange={e => SetEngineHorsePower(e.target.value)}
                        />
                    </div>
                    <div className="engine-parameter engine-expenditure-city">
                        <p>Пример: 6.9, 7.2 (л/100км)</p>
                        <input type="text" className="engine-expenditure-city-input" placeholder="Расход топлива (по городу):" 
                        onChange={e => SetEngineExpenditureCity(e.target.value)}
                        />
                    </div>
                    <div className="engine-parameter engine-expenditure-track">
                        <p>Пример: 5.4, 6.8 (л/100км)</p>
                        <input type="text" className="engine-expenditure-track-input" placeholder="Расход топлива (по трассе):" 
                        onChange={e => SetEngineExpenditureTrack(e.target.value)}
                        />
                    </div>
                    <div className="engine-parameter camshaft-system">
                        <p>Пример: dohc, vtek</p>
                        <input type="text" className="camshaft-system-input" placeholder="Система распредвалов :" 
                        onChange={e => SetEngineCamshaftSystem(e.target.value)}
                        />
                    </div>
                </div>
                <button type="button" className="add-engine-button delete" onClick={DeleteEngine}>Удалить двигатель</button>
                <button type="button" className="add-engine-button" onClick={AddEngine}>Добавить двигатель</button>
            </div>
        </>
    )
}