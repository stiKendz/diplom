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

    useEffect(() => {
        getCarData();
        getCarDescription();
    },[]);

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
                    <img src={dc2}/>
                </div>
                <div className="car-info-container">
                    <div className="short-description-container">
                        <h2>Информация об автомобиле</h2>
                        {
                            Array.isArray(carData) && carData.length > 0 ? (
                                    carData.map((car) => (
                                        <div className="car-data-container" key={car.car_id}>
                                            <div className="concern">{car.concern}</div>
                                            <div className="brand">{car.brand}</div>
                                            <div className="model-name">{car.model_name}</div>
                                            <div className="model-number">{car.model_number}</div>
                                            <div className="generation">{car.generation}</div>
                                            <div className="vehicle">{car.car_vehicle}</div>
                                            <div className="gearbox">{car.gearbox}</div>
                                            <div className="body-type">{car.body_type}</div>
                                            <div className="release-date">Старт производства: {correctDate(car.release_date)}</div>
                                            <div className="end-release-date">Окончание производства: {correctDate(car.end_release_date)}</div>
                                            <div className="price_start">Цена от: {car.price_start}р</div>
                                            <div className="price_end">До: {car.price_end}р</div>
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
                        <h2>Информация о двигателе</h2>
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
                        <div className="description">Описание автомобиля: {carDescription}</div>
                    </div>
                    <div className='car-problems-container'>
                        <h2>Проблемы автомобиля</h2>
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
                <div className="serial-name">Модель: {engine_serial_name}</div>
                <div className="size">Объем: {engine_size}</div>
                <div className="type">Тип: {engine_type}</div>
                <div className="engine_nano">Крутящий момент: {engine_nano}</div>
                <div className="engine_horse_power">Мощность л.с: {engine_horse_power}</div>
                <div className="engine_expenditure_city">Расход по городу: {engine_expenditure_city}</div>
                <div className="engine_expenditure_track">Расход по трассе: {engine_expenditure_track}</div>
                <div className="camshaft-system">Система распредвалов: {camshaft_system}</div>
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
                <div className="name">Название проблемы: {problem_name}</div>
                <div className="short-description">Краткое описание проблемы: {problem_short_description}</div>
                <div className="problem-difficult">Сложность проблемы от 1 до 5 : {difficult}</div>
                <div className="how-to-fix">Пути решения проблемы: {how_to_fixed} </div>
                <div className="fix-price">Цена решения проблемы: {problem_price}</div>
            </div>
        </>
    )
}