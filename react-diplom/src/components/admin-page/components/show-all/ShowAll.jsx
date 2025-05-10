import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/ShowAll.css'

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
                <h1>Контейнер с машинами</h1>
                <CarsList />
            </div>
        </>
    )
}

function ProblemsWindow({}) {
    return(
        <>
            <div className="problems-window-container">
                <h1>Контейнер с проблемами</h1>
                <ProblemsList />
            </div>
        </>
    )
}

function CarsProblemsWindow({}) {
    return(
        <>
            <div className="cars-problems-window-container">
                <h1>Контейнер с проблемами у машин</h1>
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

export function CarsList() {
    // переработать структуру

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

export function ProblemsList() {
    // переработать структуру

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

export function CarsAndProblemsList() {
    // переработать структуру

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
