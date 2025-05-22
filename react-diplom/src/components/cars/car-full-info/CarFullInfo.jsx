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
                        <div className="engine-container">
                            <Engine />
                        </div>
                    </div>
                    <div className="car-description-container">
                        <div className="description">Описание автомобиля: {carDescription}</div>
                    </div>
                    <div className="car-problems-container">
                        <div className="name">Название проблемы</div>
                        <div className="short-description">Краткое описание проблемы</div>
                        <div className="how-to-fix">Как исправить проблему</div>
                        <div className="fix-price">Цена исправления проблемы</div>
                        <div className="buttons-container">
                            <button type='button'>Предидущая проблема</button>
                            <button type='button'>Следующая проблема</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export function Engine() {
    return(
        <>
            <div className="engine-info">
                <div className="serial-name">Модель: </div>
                <div className="size">Объем: </div>
                <div className="type">Тип: </div>
                <div className="engine_nano">Крутящий момент: </div>
                <div className="engine_horse_power">Мощность: </div>
                <div className="engine_expenditure_city">Расход по городу: </div>
                <div className="engine_expenditure_track">Расход по трассе: </div>
                <div className="camshaft-system">Система распредвалов: </div>
            </div>
        </>
    )
}