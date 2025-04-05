import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import './styles/ShowAll.css'


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
                <button type="button" className="show-engines-button" onClick={showEnginesFunction}>
                    Просмотреть все двигатели
                </button>
                {showEngines && <EnginesWindow />}
                <button type="button" className="show-cars-button" onClick={showCarsFunction}>
                    Просмотреть все автомобили
                </button>
                {showCars && <CarsWindow />}
                <button type="button" className="show-problems-button" onClick={showProblemsFunction}>
                    Просмотреть все проблемы
                </button>
                {showProblems && <ProblemsWindow />}
                <button type="button" className="show-car-problems-button" onClick={showCarsProblemsFunction}>
                    Просмотреть все проблемы автомобилей
                </button>
                {showCarsProblems && <CarsProblemsWindow />}
            </div>
        </>
    )
}



export function CarsWindow() {
    return(
        <>
            <h1>Контейнер с машинами</h1>
        </>
    )
}

export function EnginesWindow() {
    return(
        <>
            <h1>Контейнер с двигателями</h1>
        </>
    )
}

export function ProblemsWindow() {
    return(
        <>
            <h1>Контейнер с проблемами</h1>
        </>
    )
}

export function CarsProblemsWindow() {
    return(
        <>
            <h1>Контейнер с проблемами автомобилей</h1>
        </>
    )
}