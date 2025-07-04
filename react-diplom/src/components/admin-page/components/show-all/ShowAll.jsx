import React from 'react';
import { createContext } from 'react';
import {useState, useContext, useEffect} from 'react';

import './styles/ShowAll.css'

import dc2 from '../../../../images/dc2.jpg'
// import { Engine } from "../../../cars/car-full-info/CarFullInfo.jsx";


export default function ShowAll() {
    const [showEngines, setShowEngines] = useState(false);
    const [showCars, setShowCars] = useState(false);
    const [showProblems, setShowProblems] = useState(false);
    const [showCarsProblems, setShowCarsProblems] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    

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
    function showUsersFunction() {
        setShowUsers(current => !current);
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
                    <button 
                        type="button" 
                        className="show-users-button" 
                        onClick={showUsersFunction}
                    >
                        {showUsers ? 'Закрыть окно пользователей' : 'Промотреть всех пользователей'}
                    </button>
                </div>
                <div className="show-all-windows-container">
                    { showEngines && <EnginesWindow /> }
                    { showCars && <CarsWindow /> }
                    { showProblems && <ProblemsWindow />}
                    { showCarsProblems && <CarsProblemsWindow /> }
                    { showUsers && <UsersWindow /> }
                </div>
            </div>
        </>
    )
}


function EnginesWindow() {
    return(
        <>
            <div className="engines-window-container">
                <h1>Двигатели</h1>
                <EnginesList />
            </div>
        </>
    )
}

function CarsWindow() {
    return(
        <>
            <div className="cars-window-container">
                <h1>Автомобили</h1>
                <CarsList />
            </div>
        </>
    )
}

function ProblemsWindow() {
    return(
        <>
            <div className="problems-window-container">
                <h1>Проблемы автомобилей</h1>
                <ProblemsList />
            </div>
        </>
    )
}

function CarsProblemsWindow() {
    return(
        <>
            <div className="cars-problems-window-container">
                <h1>Проблемы у автомобилей</h1>
                <CarsAndProblemsList/>
            </div>
        </>
    )
}

function UsersWindow() {
    return(
        <>
            <div className="users-window-container">
                <h1>Зарегистрированные пользователи</h1>
                <UsersList/>
            </div>
        </>
    )
}


export function EnginesList() {
    const [engines, setEngines] = useState([]);

    useEffect(() => {
        showAllEngines();
    },[]);

    async function showAllEngines() {
        const response = await fetch('http://localhost:3000/getengines', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const engineData = await response.json();

        if(engineData.allEngines) {
            setEngines(engineData.allEngines)
        };
    }

    return(
        <>
            {
                engines.map((engine, index) => (
                    <div key={index} className="engine-info">
                        <div className="engine_id">ID двигателя: {engine.engine_id}</div>
                        <div className="serial-name">Модель: {engine.engine_serial_name}</div>
                        <div className="size">Объем: {engine.engine_size}</div>
                        <div className="type">Тип: {engine.engine_type}</div>
                        <div className="engine_nano">Крутящий момент: {engine.engine_nano}</div>
                        <div className="engine_horse_power">Мощность: {engine.engine_horse_power}</div>
                        <div className="engine_expenditure_city">Расход по городу: {engine.engine_expenditure_city}</div>
                        <div className="engine_expenditure_track">Расход по трассе: {engine.engine_expenditure_track}</div>
                        <div className="camshaft-system">Система распредвалов: {engine.camshaft_system}</div>
                    </div>
                ))
            }
        </>
    )
}

export function CarsList() {
    const [cars, setCars] = useState([]);

    function correctDate(stringDate) {
        return stringDate.split('T')[0];
    }

    useEffect(() => {
        ShowAllCars();
    },[])

    async function ShowAllCars() {
        const response = await fetch('http://localhost:3000/getcars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const carsData = await response.json();

        if (carsData.allCars) {
            setCars(carsData.allCars);
        }
    }

    return(
        <>
            {
                cars.map((car, index) => (
                    <div key={index} className="car-info">
                        {/* <img className='car-image' src={dc2}/> */}
                        <div className="car_id">ID автомобиля: {car.car_id}</div>
                        <div className="brand">Марка: {car.brand}</div>
                        <div className="model-name">Модель: {car.model_name}-{car.model_number}</div>
                        <div className="generation">Поколение авто: {car.generation}</div>
                        <div className="engine_id">ID Двигателя: {car.engine_id}</div>
                        <div className="vehical">Привод: {car.car_vehicle}</div>
                        <div className="gearbox">Тип КПП: {car.gearbox}</div>
                        <div className="body-type">Тип кузова: {car.body_type}</div>
                        <div className="release-date">Старт производства: {correctDate(car.release_date)}</div>
                        <div className="end-release-date">Окончание производства: {correctDate(car.end_release_date)}</div>
                        <div className="price-start">Минимальная цена: {car.price_start}</div>
                        <div className="price-end">Максимальная цена: {car.price_end}</div>
                    </div>
                ))
            }   
        </>
    )
}

export function ProblemsList() {
    const [problems, SetProblem] = useState([]);

    useEffect(() => {
        ShowAllProblems();
    },[])

    async function ShowAllProblems() {
        const response = await fetch('http://localhost:3000/getproblems', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const problemsData = await response.json();

        if (problemsData.allProblems) {
            SetProblem(problemsData.allProblems);
        };
    }

    return(
        <>
            {
                problems.map((problem, index) => (
                    <div key={index} className="problem-info">
                        <div className="problem_id">ID проблемы: {problem.problem_id}</div>
                        <div className="problem_name">Название проблемы: {problem.problem_name}</div>
                        <div className="problem_short_description">Описание проблемы: {problem.problem_short_description}</div>    
                        <div className="difficult">Сложность проблемы: {problem.difficult}</div>
                        <div className="how_to_fixed">Пути решения: {problem.how_to_fixed}</div>
                        <div className="problem_price">Цена устранения в рублях: {problem.problem_price}</div>
                    </div>
                ))
            }
        </>
    )
}

export function CarsAndProblemsList() {
    const [carsAndProblems, SetCarProblems] = useState([]);

    useEffect(() => {
        ShowAllCarsProblems();
    },[])

    async function ShowAllCarsProblems() {
        const response = await fetch('http://localhost:3000/getcarproblems', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const carsProblemsData = await response.json();

        if (carsProblemsData.carsProblems) {
            SetCarProblems(carsProblemsData.carsProblems);
        }
    }

    return(
        <>
            {
                carsAndProblems.map((problemRow, index) => (
                    <div key={index} className="car-problems-info">
                        <div className="car_id">ID авто: {problemRow.car_id}</div>
                        <div className="brand">Марка авто: {problemRow.brand}</div>
                        <div className="model-name">Модель: {problemRow.model_name}</div>
                        <div className="generation">Поколение: {problemRow.generation}</div>
                        <div className="generation">ID проблемы: {problemRow.problem_id}</div>
                        <div className="problem_name">Название проблемы: {problemRow.problem_name}</div>
                    </div>
                ))
            }
        </>
    )
}

export function UsersList() {
    const [usersList, setUsersList] = useState([]);
    const [adminStatus, setAdminStatus] = useState({});

    useEffect(() => {
        ShowAllUsers();
    },[])

    async function ShowAllUsers() {
        const response = await fetch('http://localhost:3000/getallusers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const usersData = await response.json();

        if (usersData.successGetAllUsers) {
            setUsersList(usersData.allUsers);

            // начальный статус для всех - false
            // const initialAdminStatus = {};
            usersData.allUsers.forEach(user => {
                checkAdminStatus(user.user_id);
            });
            // setAdminStatus(initialAdminStatus);
        }

        console.log(usersData);
    }

    async function checkAdminStatus(user_id) {
        const response = await fetch('http://localhost:3000/checkadministratorstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user_id})
        });
        const data = await response.json();

        // if (data.userIsAdmin) {
        //     setIsAdmin(true);
        // } else if (data.userIsNotAdmin) {
        //     setIsAdmin(false);
        // }

        // обновление статуса для пользователя
        setAdminStatus(prev => ({
            ...prev,
            [user_id]: data.userIsAdmin ? true : false
        }));
    }

    async function AddAdministratorRights(user_id) {
        const response = await fetch('http://localhost:3000/addrigthsadministrator', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user_id})
        })
        const data = await response.json();

        if (data.noUserIdMessage) {
            alert('Невозможно прочесть ID пользователя')
        } else if (data.successAddAdministratorRights) {
            alert('Права администратора выданы');
            // обновление статуса
            setAdminStatus(prev => ({ ...prev, [user_id]: true }));
            ShowAllUsers();
        }

        console.log(data);
    }

    async function DeleteAdministratorRights(user_id) {
        const response = await fetch('http://localhost:3000/deleterigthsadministrator', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user_id})
        })
        const data = await response.json();

        if (data.noUserIdMessage) {
            alert('Невозможно прочесть ID пользователя')
        } else if (data.successDeleteAdministratorRights) {
            alert('Права администратора сняты');
            // обновление статуса
            setAdminStatus(prev => ({ ...prev, [user_id]: false }));
            ShowAllUsers();
        }

        console.log(data);
    }

    return (
        <>
            {
                usersList.map((user) => (
                    <div key={user.user_id} className="user-info">
                        <div className="user_id">ID пользователя: {user.user_id}</div>
                        <div className="user_role_name">Роль пользователя: {user.role_name}</div>
                        <div className="user_name">Имя пользователя: {user.name}</div>
                        <div className="user_surname">Фамилия пользователя: {user.surname}</div>
                        <div className="user_email">Электронная почта пользователя: {user.email}</div>
                        <div className="add-delete-rights-buttons">
                            {
                                adminStatus[user.user_id] === false ? (
                                    <>
                                        <button className='add-admin-rights' 
                                            onClick={() => AddAdministratorRights(user.user_id)}
                                        >
                                            Выдать роль администатора
                                        </button>
                                    </>
                                ) : adminStatus[user.user_id] === true ? (
                                    <>
                                        <button className='delete-admin-rights'
                                            onClick={() => DeleteAdministratorRights(user.user_id)}
                                        >
                                            Убрать роль администатора
                                        </button>
                                    </>
                                ) : (
                                    <p>Сторонняя ошибка</p>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}
