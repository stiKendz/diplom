import React from 'react';
import { createContext } from 'react';
import { useState, useContext, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Header from '../../header/Header'
import Footer from '../../footer/Footer'

import './styles/CarFullInfo.css'

import dc2 from '../../../images/dc2.jpg';

export default function CarFullInfo() {
    const pageLocation = useLocation();
    const { car_id } = pageLocation.state || {};

    const [carData, setCarData] = useState([]);
    const [carDescription, setCarDescription] = useState([]);
    const [carEngineData, setCarEngineData] = useState([]);
    const [carProblemsData, setCarProblemsData] = useState([]);
    const [carImage, setCarImage] = useState(null);

    useEffect(() => {
        getCarData();
        getCarDescription();
        getCarImage();
    }, []);

    async function getCarImage() {
        const response = await fetch('http://localhost:3000/getcarimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({car_id: String(car_id)})
        });
        const data = await response.json();

        if (data.successGetCarImage) {
            setCarImage(data.selectedImage);
        }
    }

    async function getCarData() {
        const response = await fetch('http://localhost:3000/getcardata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({car_id})
        });
        const data = await response.json();

        if (data.noCarIdMessage) {
            alert('Ошибка. Не удалось получить id автомобиля');
            console.log(data);
        }

        if (data.successGetCarData) {
            setCarData(data.selectedCarData);
            setCarEngineData(data.carEngineData);
            setCarProblemsData(data.carProblemsData);
            console.log(data);
        }
    }

    async function getCarDescription() {
        const response = await fetch('http://localhost:3000/getcardescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({car_id})
        });
        const data = await response.json();

        if (data.noDescription) {
            setCarDescription(data.noDescription);
        } else if (data.successGetCarDescription) {
            setCarDescription(data.selectedCarDescription);
        }

        console.log(data);
    }


    function correctDate(stringDate) {
        return stringDate.split('T')[0];
    }

    return(
        <main>
            <Header />
            <div className="car-full-info-container">
                <h3>Полная информация об автомобиле</h3>
                <div className="image-container">
                    <img src={carImage} alt='Нет фото'/>
                </div>
                <div className="car-info-container">
                    <div className="info">
                        <h2 className='info-message'>Информация об автомобиле</h2>
                        {
                            Array.isArray(carData) && carData.length > 0 ? (
                                    carData.map((car) => (
                                        <div className="car-data-container" key={car.car_id}>
                                            <div className="concern">
                                                <span className='item-title'>Концерн:</span> {car.concern}
                                            </div>
                                            <div className="brand">
                                                <span className='item-title'>Марка:</span> {car.brand}
                                            </div>
                                            <div className="model-name">
                                                <span className='item-title'>Модель:</span> {car.model_name}
                                            </div>
                                            <div className="model-number">
                                                <span className='item-title'>Номер модели:</span> {car.model_number}
                                            </div>
                                            <div className="generation">
                                                <span className='item-title'>Поколение:</span> {car.generation}
                                            </div>
                                            <div className="vehicle">
                                                <span className='item-title'>Привод:</span> {car.car_vehicle}
                                            </div>
                                            <div className="gearbox">
                                                <span className='item-title'>Коробка передач:</span> {car.gearbox}
                                            </div>
                                            <div className="body-type">
                                                <span className='item-title'>Тип кузова:</span> {car.body_type}
                                            </div>
                                            <div className="release-date">
                                                <span className='item-title'>Выпускался с:</span> {correctDate(car.release_date)}
                                            </div>
                                            <div className="end-release-date">
                                                <span className='item-title'>По:</span> {correctDate(car.end_release_date)}
                                            </div>
                                            <div className="price_start">
                                                <span className='item-title'>Цена (рубли) от:</span> {car.price_start}р
                                            </div>
                                            <div className="price_end">
                                                <span className='item-title'>До (рубли):</span> {car.price_end}р
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <>
                                    <p>Не удалось загрузить данные</p>
                                </>
                            )
                        }
                    </div>
                    <div className="engine-container">
                        <h2 className='engine-message'>Информация о двигателе</h2>
                        {
                            Array.isArray(carEngineData) && carEngineData.length > 0 ? (
                                carEngineData.map((engine) => (
                                    <Engine 
                                        key={engine.engine_id}
                                        engine_serial_name={engine.engine_serial_name}
                                        engine_size={engine.engine_size}
                                        engine_type={engine.engine_type}
                                        engine_nano={engine.engine_nano}
                                        engine_horse_power={engine.engine_horse_power}
                                        engine_expenditure_city={engine.engine_expenditure_city}
                                        engine_expenditure_track={engine.engine_expenditure_track}
                                        camshaft_system={engine.camshaft_system}
                                    />
                                ))
                            ) : (
                                <>
                                    <p>Невозможно получить данные о двигателе</p>
                                </>
                            )
                        }
                    </div>
                    <div className="car-description-container">
                        <div className="description">{carDescription}</div>
                    </div>
                    <div className='car-problems-container'>
                        <h2 className='problems-message'>Проблемы автомобиля</h2>
                        {
                            Array.isArray(carProblemsData) && carProblemsData.length === 0 ? (
                                <>
                                    <p>У данного автомобиля нет проблем, или они ещё не добавлены/не обнаружены.</p>
                                </>
                            ) : (
                                carProblemsData.map((problem) => (
                                    <Problem 
                                        key={problem.problem_id}
                                        problem_name={problem.problem_name}
                                        problem_short_description={problem.problem_short_description}
                                        difficult={problem.difficult}
                                        how_to_fixed={problem.how_to_fixed}
                                        problem_price={problem.problem_price}
                                    />
                                ))
                            ) 
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export function Engine({ 
    engine_serial_name, 
    engine_size, 
    engine_type, 
    engine_nano, 
    engine_horse_power, 
    engine_expenditure_city, 
    engine_expenditure_track, 
    camshaft_system 
}) {
    return(
        <>
            <div className="engine-info">
                <div className="serial-name">
                    <span className='item-title'>Модель:</span> {engine_serial_name}
                </div>
                <div className="size">
                    <span className='item-title'>Объем:</span> {engine_size}
                </div>
                <div className="type">
                    <span className='item-title'>Тип:</span> {engine_type}
                </div>
                <div className="engine_nano">
                    <span className='item-title'>Крутящий момент:</span> {engine_nano}
                </div>
                <div className="engine_horse_power">
                    <span className='item-title'>Мощность л.с:</span> {engine_horse_power}
                </div>
                <div className="engine_expenditure_city">
                    <span className='item-title'>Расход по городу:</span> {engine_expenditure_city}
                </div>
                <div className="engine_expenditure_track">
                    <span className='item-title'>Расход по трассе:</span> {engine_expenditure_track}
                </div>
                <div className="camshaft-system">
                    <span className='item-title'>Система распредвалов:</span> {camshaft_system}
                </div>
            </div>
        </>
    )
}


export function Problem({ 
    problem_name, 
    problem_short_description, 
    difficult, 
    how_to_fixed, 
    problem_price
}) {
    return(
        <>
            <div className="car-problem-info">
            <div className="name"><span className='item-title'>Проблема:</span> {problem_name}</div>
            <div className="short-description"><span className='item-title'>Описание:</span> {problem_short_description}</div>
            <div className="problem-difficult">
                <span className='item-title'>Оценка сложности (1-5):</span> {difficult}
            </div>
            <div className="how-to-fix"><span className='item-title'>Пути решения:</span> {how_to_fixed}</div>
            <div className="fix-price"><span className='item-title'>Стоимость решения проблемы (в рублях):</span> {problem_price}</div>
        </div>
        </>
    )
}