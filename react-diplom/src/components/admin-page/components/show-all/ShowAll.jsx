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
                    {showEngines ? 'Закрыть окно' : 'Промотреть все двигатели'}
                </button>
                { showEngines && <EnginesWindow /> }
                <button type="button" className="show-cars-button" onClick={showCarsFunction}>
                    {showCars ? 'Закрыть окно' : 'Промотреть все автомобили'}
                </button>
                { showCars && <CarsWindow /> }
                <button type="button" className="show-problems-button" onClick={showProblemsFunction}>
                    {showProblems ? 'Закрыть окно' : 'Промотреть все проблемы'}
                </button>
                { showProblems && <ProblemsWindow />}
                <button type="button" className="show-car-problems-button" onClick={showCarsProblemsFunction}>
                    {showCarsProblems ? 'Закрыть окно' : 'Промотреть все проблемы автомобилей'}
                </button>
                { showCarsProblems && <CarsProblemsWindow /> }
            </div>
        </>
    )
}


function EnginesWindow({}) {
    return(
        <>
            <div className="engines-window-container">
                <h1>Контейнер с двигателями</h1>
            </div>
        </>
    )
}

function CarsWindow({}) {
    return(
        <>
            <div className="cars-window-container">
                <h1>Контейнер с машинами</h1>
            </div>
        </>
    )
}

function ProblemsWindow({}) {
    return(
        <>
            <div className="problems-window-container">
                <h1>Контейнер с проблемами</h1>
            </div>
        </>
    )
}

function CarsProblemsWindow({closeCarsPoblemsWindow}) {

    return(
        <>
            <div className="cars-problems-window-container">
                <h1>Контейнер с проблемами у машин</h1>
            </div>
        </>
    )
}
