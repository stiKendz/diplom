import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

export default function AddCar(){
    const [concern, setCarConcern] = useState('');
    const [brand, SetCarBrand] = useState('');
    const [model_name, SetCarModelName] = useState('');
    const [generation, SetCarGeneration] = useState('');
    const [model_number, SetCarModelNumber] = useState('');
    const [release_date, SetCarReleaseDate] = useState('');
    const [end_release_date, SetCarEndReleaseDate] = useState('');
    const [engine_id, SetCarEngineId] = useState('');
    const [gearbox, SetCarGearbox] = useState('');
    const [car_vehicle, SetCarVehicle] = useState('');
    const [body_type, SetCarBodyType] = useState('');
    const [price, SetCarPrice] = useState('');
 
    async function AddCar() {
        const response = await fetch('http://localhost:3000/addcar', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, gearbox, car_vehicle, body_type, price})
        });
 
        const data = await response.json();
 
        console.log(data);
    }

    return(
        <>
            <div className="add-car-container">
                <div className="car-parameters-container">
                    <h2>Добавление автомобиля</h2>
                    <div className="car-parameter concern">
                        <p>пример: VAG, PSA</p>
                        <input type="text" className="concern-input" placeholder="Концерн автомобиля:" 
                        onChange={e => setCarConcern(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter brand">
                        <p>пример: Skoda, Peugeot</p>
                        <input type="text" className="brand-input" placeholder="Бренд автомобиля:" 
                        onChange={e => SetCarBrand(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter model-name">
                        <p>пример: integra, impreza</p>
                        <input type="text" className="model-input" placeholder="Название модели автомобиля:" 
                        onChange={e => SetCarModelName(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter generation">
                        <p>пример: 1, 2, 3</p>
                        <input type="text" className="generation-input" placeholder="Поколение автомобиля:" 
                        onChange={e => SetCarGeneration(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter model-number">
                        <p>пример: DC5, GC8</p>
                        <input type="text" className="model-number-input" placeholder="Номер модели автомобиля:" 
                        onChange={e => SetCarModelNumber(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter release-date">
                        <p>пример: 01-01-2001</p>
                        <input type="date" className="release-date-input" placeholder="Дата запуска производства автомобиля:" 
                        onChange={e => SetCarReleaseDate(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter end-release-date">
                        <p>пример: 01-01-2002</p>
                        <input type="date" className="end-release-date-input" placeholder="Дата окончания производства автомобиля:" 
                        onChange={e => SetCarEndReleaseDate(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter engine-id">
                        <p>пример: 1, 2, 3</p>
                        <input type="text" className="engine-id-input" placeholder="ID двигателя автомобиля:" 
                        onChange={e => SetCarEngineId(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter gearbox">
                        <p>пример: sequental, auto</p>
                        <input type="text" className="gearbox-input" placeholder="КПП автомобиля:" 
                        onChange={e => SetCarGearbox(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter car-vehicle">
                        <p>пример: rwd, awd</p>
                        <input type="text" className="vehicle-input" placeholder="Привод автомобиля:" 
                        onChange={e => SetCarVehicle(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter car-body-type">
                        <p>пример: sedan, coupe</p>
                        <input type="text" className="body-type-input" placeholder="Кузов автомобиля:" 
                        onChange={e => SetCarBodyType(e.target.value)}
                        />
                    </div>
                    <div className="car-parameter price">
                        <p>пример: 100.000тыс.руб</p>
                        <input type="text" className="price-input" placeholder="Цена автомобиля:" 
                        onChange={e => SetCarPrice(e.target.value)}
                        />
                    </div>
                    <button type="button" className="add-car-button" onClick={AddCar}>Добавить автомобиль</button>
                </div>
            </div>
        </>
    )
}