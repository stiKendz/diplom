import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import Header from '../header/Header'

import AddProblemToCar from './components/AddProblemToCar';
import UpdateAndDeleteCar from './components/UpdateAndDeleteCar';
import AddPhoto from './components/AddPhoto';

import Footer from '../footer/Footer'

export default function AdminPage() {
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

        console.log(data);
    }
    async function ShowEngines() {

    }


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
    async function ShowCars() {

    }


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
    async function ShowProblems() {

    }

    return(
        <>
            <Header />
            <main className="adminpage">
                <div className="overlay"></div>
                <div className="main-container">
                    <div className="warning-messages-container">
                        <p className="warning-message"><span>Обратите внимание</span>, что перед добавлением автомобиля, необходимо добавить двигатель от него, 
                            если таковой имеется, приступить к добавлению автомбиля.</p>
                        <p className="ps-message"><span>Список</span> всех <span className="alter">двигателей</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все двигатели"</p>
                        <p className="ps-message-cars"><span>Список</span> всех <span className="alter">автомобилей</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все автомобили"</p>
                        <p className="ps-message-problems"><span>Список</span> всех <span className="alter">проблем</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все проблемы"</p>
                        <p className="ps-message-car-problems"><span>Список</span> всех <span className="alter">проблем автомобилей</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все проблемы автомобилей"</p>
                    </div>
                    <div className="modal-buttons-container">
                        <button type="button" className="show-engines-button">Просмотреть все двигатели</button>
                        <button type="button" className="show-cars-button">Просмотреть все автомобили</button>
                        <button type="button" className="show-problems-button">Просмотреть все проблемы</button>
                        <button type="button" className="show-car-problems-button">Просмотреть все проблемы атомобилей</button>
                    </div>
                    <div className="engine-modal-window">
                        <div className="window-content">
                            <button type="button" className="engine-modal-close-button">Закрыть окно</button>
                            <pre className="engine-window-content">Вывод всех двигателей теперь будет здесь</pre>
                        </div>
                    </div>
                    <div className="car-modal-window">
                        <div className="window-content">
                            <button type="button" className="car-modal-close-button">Закрыть окно</button>
                            <pre className="car-window-content">Вывод всех автомобилей теперь будет здесь</pre>
                        </div>
                    </div>
                    <div className="problem-modal-window">
                        <div className="window-content">
                            <button type="button" className="problem-modal-close-button">Закрыть окно</button>
                            <pre className="problem-window-content">Вывод всех проблем теперь будет здесь</pre>
                        </div>
                    </div>
                    <div className="car-problem-modal-window">
                        <div className="window-content">
                            <button type="button" className="car-problem-modal-close-button">Закрыть окно</button>
                            <pre className="car-problem-window-content">Вывод всех проблем автомобилей теперь будет здесь</pre>
                        </div>
                    </div>
                    <div className="engine-add-container">
                        <div className="engine-parameters-container">
                            <h2>Добавление двигателя</h2>
                            <div className="engine-parameter serial-name">
                                <p>пример: ej20, 4g18</p>
                                <input type="text" className="serial-number-input" placeholder="Серийный номер двигателя:" 
                                onChange={e => setEngineSerialName(e.target.value)}
                                />
                            </div>
                            <div className="engine-parameter engine-size">
                                <p>пример: 1.6, 2.0</p>
                                <input type="text" className="engine-size-input" placeholder="Объем двигателя:" 
                                onChange={e => SetEngineSize(e.target.value)}
                                />
                            </div>
                            <div className="engine-parameter engine-type">
                                <p>пример: inline, rotary</p>
                                <input type="text" className="engine-type-input" placeholder="Тип двигателя двигателя:" 
                                onChange={e => SetEngineType(e.target.value)}
                                />
                            </div>
                            <div className="engine-parameter engine-nano">
                                <p>пример: 320nm, 240nm</p>
                                <input type="text" className="engine-nano-input" placeholder="Крутящий момент двигателя:" 
                                onChange={e => SetEngineNano(e.target.value)}
                                />
                            </div>
                            <div className="engine-parameter engine-horse-power">
                                <p>пример: 123hp, 240лс</p>
                                <input type="text" className="engine-horse-power-input" placeholder="Мощность л.с (лошадиные силы) двигателя:" 
                                onChange={e => SetEngineHorsePower(e.target.value)}
                                />
                            </div>
                            <div className="engine-parameter engine-expenditure-city">
                                <p>пример: 6.9, 7.2</p>
                                <input type="text" className="engine-expenditure-city-input" placeholder="Расход топлива двигателя (по городу):" 
                                onChange={e => SetEngineExpenditureCity(e.target.value)}
                                />
                            </div>
                            <div className="engine-parameter engine-expenditure-track">
                                <p>пример: 5.4, 6.8</p>
                                <input type="text" className="engine-expenditure-track-input" placeholder="Расход топлива двигателя (по трассе):" 
                                onChange={e => SetEngineExpenditureTrack(e.target.value)}
                                />
                            </div>
                            <div className="engine-parameter camshaft-system">
                                <p>пример: dohc, vtek</p>
                                <input type="text" className="camshaft-system-input" placeholder="Система распредвалов двигатея:" 
                                onChange={e => SetEngineCamshaftSystem(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="button" className="add-engine-button" onClick={AddEngine}>Добавить двигатель</button>
                    </div>
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
                        <div className="car-description-container">
                            <h2 className="car-decsription">Описание автомобиля</h2>
                            <input type="text" className="car-desription-input" placeholder="Краткое описание автомобиля"
                            onChange={e => SetCarDescription(e.target.value)}
                            />
                            <input type="number" className="car-description-id-input" placeholder="Введите ID автомобиля" 
                            onChange={e => SetCarIdInDescription(e.target.value)}
                            />
                            <button type="button" className="add-description-button" onClick={AddCarDescription}>Добавить описание</button>
                        </div>
                    </div>
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
                    <AddProblemToCar />
                    <UpdateAndDeleteCar />
                    <hr></hr>
                    <AddPhoto />
                </div>
            </main>
            <Footer />
        </>
    )
}