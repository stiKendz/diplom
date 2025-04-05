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

    function closeWindow() {
        setShowCars(false);
    }

    return(
        <>
            <div className="show-all-container">
                <button type="button" className="show-engines-button" onClick={showEnginesFunction}>
                    Просмотреть все двигатели
                </button>
                {
                    showEngines && <EnginesWindow closeWindow = {closeWindow}/>
                }
                <button type="button" className="show-cars-button" onClick={showCarsFunction}>
                    Просмотреть все автомобили
                </button>
                {
                    showCars && <CarsWindow closeWindow = {closeWindow}/>
                }
                <button type="button" className="show-problems-button" onClick={showProblemsFunction}>
                    Просмотреть все проблемы
                </button>
                {
                    showProblems && <ProblemsWindow closeWindow = {closeWindow}/>
                }
                <button type="button" className="show-car-problems-button" onClick={showCarsProblemsFunction}>
                    Просмотреть все проблемы автомобилей
                </button>
                {
                    showCarsProblems && <CarsProblemsWindow closeWindow = {closeWindow}/>
                }
            </div>
        </>
    )
}


function EnginesWindow({closeWindow}) {
    return(
        <>
            <div className="engines-window-container">
                <button type='button' className='close-window-button' onClick={closeWindow}>Закрыть окно</button>
                <h1>Контейнер с двигателями</h1>
            </div>
        </>
    )
}

function CarsWindow({closeWindow}) {
    return(
        <>
            <div className="cars-window-container">
                <button type='button' className='close-window-button' onClick={closeWindow}>Закрыть окно</button>
                <h1>Контейнер с машинами</h1>
            </div>
        </>
    )
}

function ProblemsWindow({closeWindow}) {
    return(
        <>
            <div className="problems-window-container">
                <button type='button' className='close-window-button' onClick={closeWindow}>Закрыть окно</button>
                <h1>Контейнер с проблемами</h1>
            </div>
        </>
    )
}

function CarsProblemsWindow({closeWindow}) {
    return(
        <>
            <div className="cars-problems-window-container">
                <button type='button' className='close-window-button' onClick={closeWindow}>Закрыть окно</button>
                <h1>Контейнер с проблемами у машин</h1>
            </div>
        </>
    )
}