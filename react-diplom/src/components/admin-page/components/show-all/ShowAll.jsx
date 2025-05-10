import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/ShowAll.css'

import dc2 from '../../../../images/dc2.jpg'
// import { Engine } from "../../../cars/car-full-info/CarFullInfo.jsx";


export default function ShowAll() {
    const [showEngines, setShowEngines] = useState(false);
    const [showCars, setShowCars] = useState(false);
    const [showProblems, setShowProblems] = useState(false);
    const [showCarsProblems, setShowCarsProblems] = useState(false);
    

    function showEnginesFunction() {
        setShowEngines(current => !current);
    }
    function showCarsFunction() {
        setShowCars(current => !current);
    }
    function showProblemsFunction() {
        setShowProblems(current => !current);
    }
    function showCarsProblemsFunction() {
        setShowCarsProblems(current => !current);
    }

    return(
        <>
            <div className="show-all-container">
                <div className="buttons-container">
                    <button 
                        type="button" 
                        className="show-engines-button" 
                        onClick={showEnginesFunction}
                    >
                        {showEngines ? 'Закрыть окно двигателей' : 'Промотреть все двигатели'}
                    </button>
                    <button 
                        type="button" 
                        className="show-cars-button" 
                        onClick={showCarsFunction}
                    >
                        {showCars ? 'Закрыть окно автомобилей' : 'Промотреть все автомобили'}
                    </button>
                    <button 
                        type="button" 
                        className="show-problems-button" 
                        onClick={showProblemsFunction}
                    >
                        {showProblems ? 'Закрыть окно проблем' : 'Промотреть все проблемы'}
                    </button>
                    <button 
                        type="button" 
                        className="show-car-problems-button" 
                        onClick={showCarsProblemsFunction}
                    >
                        {showCarsProblems ? 'Закрыть окно проблем автомобилей' : 'Промотреть все проблемы автомобилей'}
                    </button>
                </div>
                <div className="show-all-windows-container">
                    { showEngines && <EnginesWindow /> }
                    { showCars && <CarsWindow /> }
                    { showProblems && <ProblemsWindow />}
                    { showCarsProblems && <CarsProblemsWindow /> }
                </div>
            </div>
        </>
    )
}


function EnginesWindow({}) {
    return(
        <>
            <div className="engines-window-container">
                <h1>Двигатели</h1>
                <EnginesList />
            </div>
        </>
    )
}

function CarsWindow({}) {
    return(
        <>
            <div className="cars-window-container">
                <h1>Автомобили</h1>
                <CarsList />
            </div>
        </>
    )
}

function ProblemsWindow({}) {
    return(
        <>
            <div className="problems-window-container">
                <h1>Проблемы автомобилей</h1>
                <ProblemsList />
            </div>
        </>
    )
}

function CarsProblemsWindow({}) {
    return(
        <>
            <div className="cars-problems-window-container">
                <h1>Проблемы у автомобилей</h1>
                <CarsAndProblemsList/>
            </div>
        </>
    )
}


export function EnginesList() {
    // запрос будет отличаться от того, что планируется добавить в вывод информации о двигателе

    return(
        <>
            <div className="engine-info">
                <div className="serial-name">Модель: 11111</div>
                <div className="size">Объем: 11111</div>
                <div className="type">Тип: 11111</div>
                <div className="engine_nano">Крутящий момент: 11111</div>
                <div className="engine_horse_power">Мощность: 11111</div>
                <div className="engine_expenditure_city">Расход по городу: 1111</div>
                <div className="engine_expenditure_track">Расход по трассе: 1111</div>
                <div className="camshaft-system">Система распредвалов: 11111</div>
            </div>
        </>
    )
}

export function CarsList() {
    // переработать структуру

    return(
        <>
            <div className="car-info">
                <img className='car-image'src={dc2}/>
                <div className="brand">Honda</div>
                <div className="model-name">Модель</div>
                <div className="generation">Поколение авто:</div>
                <div className="vehical">Привод</div>
                <div className="gearbox">Тип КПП</div>
                <div className="body-type">Тип кузова</div>
                <div className="release-date">Старт производства: 2001</div>
                <div className="end-release-date">Окончание производства: 2004</div>
                <div className="price">Цена: 400.000.руб - 1.200.000.руб</div>
            </div>
        </>
    )
}

export function ProblemsList() {
    // переработать структуру

    return(
        <>
            <div className="problem-info">
                <div className="problem_name">Название проблемы: </div>
                <div className="problem_short_description">Описание проблемы: </div>
                <div className="difficult">Сложность проблемы: </div>
                <div className="how_to_fixed">Пути решения:</div>
                <div className="problem_price">Цена устранения: </div>
            </div>
        </>
    )
}

export function CarsAndProblemsList() {
    // переработать структуру

    return(
        <>
            <div className="car-problems-info">
                <div className="brand">Марка авто</div>
                <div className="model-name">Модель</div>
                <div className="generation">Поколение авто:</div>
                <div className="problem_name">Название проблемы: </div>
            </div>
        </>
    )
}
