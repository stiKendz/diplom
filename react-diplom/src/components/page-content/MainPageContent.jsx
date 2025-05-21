import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useState, useContext } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import CarCard from '../cars/car-card/CarCard';

import { AdditionContext, filtersDescription } from './AdditionContext';
import { TokenContext } from '../contexts/TokenContext';

import { useCars } from '../contexts/CarsContext';
import { UseFilteredCarsContext } from '../contexts/FIlteredCarsContext';

import './styles/MainPageContent.css'

import dcImage from '../../images/dc2.jpg'
import w211Image from '../../images/w211.jpg'
import rollsRoyce from '../../images/rollsRoyce.jpg'

const FiltersArrayContext = createContext();

export default function MainPageContent() {
    const navigate = useNavigate();
    const [token, getToken] = useState(() => window.localStorage.getItem('token'));

    // const [showResults, setShowResults] = useState(false);
    // const [filteredCarsArray, setFilteredCars] = useState([]);

    let filtersArray = [];
   
    const { showResults, setShowResults, filteredCarsArray, setFilteredCars } = UseFilteredCarsContext();
     useEffect(() => {
        setFilteredCars();
        console.log(filtersArray);
        console.log(showResults);
    },[])


    const cars = useCars();

    // const showFilters = () => {
    //     return console.log('Массив фильтров ' + filtersArray.map((element) => element));
    // };
    // const dropFilters = () => {
    //     filtersArray.length = 0;
    //     return console.log('Массив фильтров ' + filtersArray);
    // };
    function correctDate(stringDate) {
        return stringDate.split('T')[0];
    }


    const getFilteredCars = async () => {
        // Данную проверку на пустые поля добавлю позже, после реализации работы всех фильтров в приложении
        // const dateStartPos = 5; 
        // const dateEndPos = 6;
        // const filtersArrayDates = dateEndPos >= dateStartPos ? dateEndPos - dateStartPos + 1 : 0;
        // console.log(filtersArrayDates)
        // if (filtersArrayDates !== 2) {
        //     return alert('Пожалуйста, заполните оба поля с датой выпуска автомобиля');
        // } else if (filtersArrayDates === 0 || filtersArrayDates === 1 || filtersArrayDates === undefined || filtersArrayDates === null) {
        //     return alert('Пожалуйста, заполните оба поля с датой выпуска автомобиля');
        // }
        const rangeInputs = document.querySelectorAll('input.range');
        rangeInputs.forEach(input => {
            input.value = '';
        });

        if (!token) {
            return alert('Пожалуйста, войдите или зарегистрируйтесь перед использованием приложения.')
        } else if (token && filtersArray.some(filter => !filter) || filtersArray.length === 0) {
            return alert('Пожалуйста, заполните все поля.')
        }

        const filteredFiltersArray = filtersArray.filter(Boolean).map(filter => filter);
        console.log('Отправленный массив фильтров' + filteredFiltersArray);

        if (filteredFiltersArray === 0) {
            return alert('Не выбраны фильтры для поиска');
        }

        const emptyString = filteredFiltersArray.find((element) => element == '-12-31' || element == '');
        if (emptyString != undefined) {
            return alert('Обнаружена пустая строка')
        }

        try {
            const response = await fetch('http://localhost:3000/getfilteredcars', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filtersNames: filteredFiltersArray })
            });

            const filteredCars = await response.json();
            console.log(filteredCars);

            if (filteredCars.allFilteredCars) {
                setFilteredCars(filteredCars.allFilteredCars);
                setShowResults(true);
            }

            if (filteredCars.noFilterMessage) {
                alert('Пожалуйста, заполните все поля');
            }

        } catch (error) {
            console.error('Ошибка при получении автомобилей:', error);
        }
    };


    return(
        <TokenContext.Provider value={getToken}>
            <AdditionContext value={filtersDescription}>
                <FiltersArrayContext value={filtersArray}>
                    <div className="main-page">
                        <Header />
                        <div className="main-container">
                            {
                                !token ? (
                                    <>
                                        <section className="hello-card">
                                            <p className="hello-message">Сделайте правильный выбор в мире автомобилей</p>
                                            <p className="information-message"> 
                                                <span onClick={() => navigate('sing-in', {replace: false})}>Войдите </span> 
                                                для использования приложения. Нет аккаунта?
                                                <span onClick={() => navigate('sing-up', {replace: false})}> Зарегистрируйтесь </span>
                                                
                                            </p>
                                        </section>
                                    </>
                                ) : (
                                    <>
                                        <div className='space'></div> 
                                        <section className="filters-container">
                                            <FilterCompany
                                                id="company"
                                                src={w211Image}
                                                filterName={"Выберете марку автомобиля"}
                                                itemOne={"Любая"}
                                                itemTwo={"Peugeot"}
                                                itemThree={"Honda"}
                                                itemFour={"Mercedes-Benz"}
                                            />
                                            <FilterGearbox
                                                id="gearbox" 
                                                src={rollsRoyce} 
                                                filterName={"Выберите тип КПП"}
                                                itemOne={"Любая"}
                                                itemTwo={"Механическая (MT)"}
                                                itemThree={"Автоматическая (AT)"}
                                                itemFour={"Вариатор (CVT)"}
                                                itemFive={"Роботизированная (AMT/DSG)"}
                                                itemSix={"Гибридая"}
                                            />
                                            <FilterBodyType
                                                id="bodyType" 
                                                src={rollsRoyce} 
                                                filterName={"Выберите тип кузова"}
                                                itemOne={"Любой"}
                                                itemTwo={"Седан"}
                                                itemThree={"Хэтчбек"}
                                                itemFour={"Универсал"}
                                                itemFive={"Купе"}
                                            />
                                            <FilterVehicle 
                                                id="vehicle" 
                                                src={rollsRoyce} 
                                                filterName={"Выберите привод"}
                                                itemOne={"Любой"}
                                                itemTwo={"FWD"}
                                                itemThree={"RWD"}
                                                itemFour={"AWD"}
                                                itemFive={"Подключаемый полный"}
                                            />
                                            <RangeFilterRelease 
                                                id='release'
                                                src={dcImage}
                                                filterName={"Выберите год выпуска"}
                                                minPlaceholder={'1980'}
                                                maxPlaceholder={'2025'}
                                            />
                                            <RangeFilterPrice
                                                id='price'
                                                src={dcImage}
                                                filterName={"Выберите цену"}
                                                minPlaceholder={'60.000'}
                                                maxPlaceholder={'10.000.000'}
                                            />
                                        </section>
                                        <div className="output-result-container">
                                            <div className="buttons-container">
                                                <button 
                                                    className='get-results-button'
                                                    onClick={getFilteredCars}
                                                >
                                                    Подобрать автомобили
                                                </button>
                                            </div>
                                            {
                                                showResults && (
                                                    <>
                                                        <h1 className='result-message'>
                                                            Вам могут подойти следующие автомобили
                                                        </h1>
                                                        <div className="results-cars">
                                                            <div className="filtered-cars">
                                                                {
                                                                    Array.isArray(filteredCarsArray) && filteredCarsArray.length > 0 ? (
                                                                        filteredCarsArray.map((car, index) => (
                                                                            <CarCard key={index} 
                                                                                car_id={car.car_id}
                                                                                brand={car.brand}
                                                                                model_name={car.model_name}
                                                                                model_number={car.model_number}
                                                                                // car_vehicle={car.car_vehicle}
                                                                                // gearbox={car.gearbox}
                                                                                // body_type={car.body_type}
                                                                                release_date={correctDate(car.release_date)}
                                                                                end_release_date={correctDate(car.end_release_date)}
                                                                                price_start={car.price_start}
                                                                                price_end={car.price_end}
                                                                            />
                                                                        ))
                                                                    ) : (
                                                                        <p>Нет доступных автомобилей</p>
                                                                    )   
                                                                }
                                                            </div>  
                                                            <h2>Разделитель</h2>
                                                            {
                                                                Array.isArray(cars) && cars.length > 0 ? (
                                                                    cars.map((car, index) => (
                                                                        <div key={index}>
                                                                            <div className="brand">Марка: {car.brand}</div>
                                                                            <div className="model-name">Модель: {car.model_name}-{car.model_number}</div>
                                                                            <div className="vehical">Привод: {car.car_vehicle}</div>
                                                                            <div className="gearbox">Тип КПП: {car.gearbox}</div>
                                                                            <div className="body-type">Тип кузова: {car.body_type}</div>
                                                                            <div className="release-date">Старт производства: {correctDate(car.release_date)}</div>
                                                                            <div className="end-release-date">Окончание производства: {correctDate(car.end_release_date)}</div>
                                                                            <div className="price-start">Минимальная цена: {car.price_start}</div>
                                                                            <div className="price-end">Максимальная цена: {car.price_end}</div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <p>Нет доступных автомобилей</p>
                                                                )   
                                                            }
                                                        </div>
                                                    </>
                                                ) 
                                            }
                                        </div>
                                    </> 
                                )
                            }
                        </div>
                        <Footer />
                    </div>
                    <Outlet />
                </FiltersArrayContext>
            </AdditionContext>
        </TokenContext.Provider>
    )
}



function FilterCompany({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive, itemSix}) {
    const [showAddition, setShowAddition] = useState(false);
    
    const FiltersArrayFromContext = useContext(FiltersArrayContext);

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    function imageFullScreen({target}) {
        if(!document.fullscreenElement) {
            target.requestFullscreen()
            .catch((error) => console.log(error));
        } else {
            document.exitFullscreen();
        }
    };

    return(
        <>
            <div className="filter" id={id}>
                <img id={id} src={src} onClick={imageFullScreen}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    {itemOne && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOne}>{itemOne}</div>}
                    {itemTwo && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwo}>{itemTwo}</div>}
                    {itemThree && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThree}>{itemThree}</div>}
                    {itemFour && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFour}>{itemFour}</div>}
                    {itemFive && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFive}>{itemFive}</div>}
                    {itemSix && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSix}>{itemSix}</div>}
                </div>
                <div className="text-addition" id={id}>
                    <button className='open-addition' onClick={openAddition}>
                        {showAddition ? 'Закрыть поясение' : 'Открыть пояснение'}
                    </button> 
                    {
                        showAddition
                        &&
                        <FilterAddition
                            bigAdditionText = {description.bigAddition}
                            smallAdditionText = {description.smallAddition}
                        />
                    }
                </div>
            </div>
        </>
    )
}



function FilterGearbox({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive, itemSix}) {
    const [showAddition, setShowAddition] = useState(false);
    
    const FiltersArrayFromContext = useContext(FiltersArrayContext);

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    function imageFullScreen({target}) {
        if(!document.fullscreenElement) {
            target.requestFullscreen()
            .catch((error) => console.log(error));
        } else {
            document.exitFullscreen();
        }
    };

    return(
        <>
            <div className="filter" id={id}>
                <img id={id} src={src} onClick={imageFullScreen}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    {itemOne && <div className='item' id={id} onClick={() => FiltersArrayFromContext[1] = itemOne}>{itemOne}</div>}
                    {itemTwo && <div className='item' id={id} onClick={() => FiltersArrayFromContext[1] = itemTwo}>{itemTwo}</div>}
                    {itemThree && <div className='item' id={id} onClick={() => FiltersArrayFromContext[1] = itemThree}>{itemThree}</div>}
                    {itemFour && <div className='item' id={id} onClick={() => FiltersArrayFromContext[1] = itemFour}>{itemFour}</div>}
                    {itemFive && <div className='item' id={id} onClick={() => FiltersArrayFromContext[1] = itemFive}>{itemFive}</div>}
                    {itemSix && <div className='item' id={id} onClick={() => FiltersArrayFromContext[1] = itemSix}>{itemSix}</div>}
                </div>
                <div className="text-addition" id={id}>
                    <button className='open-addition' onClick={openAddition}>
                        {showAddition ? 'Закрыть поясение' : 'Открыть пояснение'}
                    </button> 
                    {
                        showAddition
                        &&
                        <FilterAddition
                            bigAdditionText = {description.bigAddition}
                            smallAdditionText = {description.smallAddition}
                        />
                    }
                </div>
            </div>
        </>
    )
}



function FilterBodyType({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive, itemSix}) {
    const [showAddition, setShowAddition] = useState(false);
    
    const FiltersArrayFromContext = useContext(FiltersArrayContext);

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    function imageFullScreen({target}) {
        if(!document.fullscreenElement) {
            target.requestFullscreen()
            .catch((error) => console.log(error));
        } else {
            document.exitFullscreen();
        }
    };

    return(
        <>
            <div className="filter" id={id}>
                <img id={id} src={src} onClick={imageFullScreen}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    {itemOne && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemOne}>{itemOne}</div>}
                    {itemTwo && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemTwo}>{itemTwo}</div>}
                    {itemThree && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemThree}>{itemThree}</div>}
                    {itemFour && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemFour}>{itemFour}</div>}
                    {itemFive && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemFive}>{itemFive}</div>}
                    {itemSix && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemSix}>{itemSix}</div>}
                </div>
                <div className="text-addition" id={id}>
                    <button className='open-addition' onClick={openAddition}>
                        {showAddition ? 'Закрыть поясение' : 'Открыть пояснение'}
                    </button> 
                    {
                        showAddition
                        &&
                        <FilterAddition
                            bigAdditionText = {description.bigAddition}
                            smallAdditionText = {description.smallAddition}
                        />
                    }
                </div>
            </div>
        </>
    )
}



function FilterVehicle({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive, itemSix}) {
    const [showAddition, setShowAddition] = useState(false);
    
    const FiltersArrayFromContext = useContext(FiltersArrayContext);

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    function imageFullScreen({target}) {
        if(!document.fullscreenElement) {
            target.requestFullscreen()
            .catch((error) => console.log(error));
        } else {
            document.exitFullscreen();
        }
    };

    return(
        <>
            <div className="filter" id={id}>
                <img id={id} src={src} onClick={imageFullScreen}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    {itemOne && <div className='item' id={id} onClick={() => FiltersArrayFromContext[3] = itemOne}>{itemOne}</div>}
                    {itemTwo && <div className='item' id={id} onClick={() => FiltersArrayFromContext[3] = itemTwo}>{itemTwo}</div>}
                    {itemThree && <div className='item' id={id} onClick={() => FiltersArrayFromContext[3] = itemThree}>{itemThree}</div>}
                    {itemFour && <div className='item' id={id} onClick={() => FiltersArrayFromContext[3] = itemFour}>{itemFour}</div>}
                    {itemFive && <div className='item' id={id} onClick={() => FiltersArrayFromContext[3] = itemFive}>{itemFive}</div>}
                    {itemSix && <div className='item' id={id} onClick={() => FiltersArrayFromContext[3] = itemSix}>{itemSix}</div>}
                </div>
                <div className="text-addition" id={id}>
                    <button className='open-addition' onClick={openAddition}>
                        {showAddition ? 'Закрыть поясение' : 'Открыть пояснение'}
                    </button> 
                    {
                        showAddition
                        &&
                        <FilterAddition
                            bigAdditionText = {description.bigAddition}
                            smallAdditionText = {description.smallAddition}
                        />
                    }
                </div>
            </div>
        </>
    )
}


function RangeFilterRelease({ id='', src='', filterName, minPlaceholder, maxPlaceholder }) {
    const [showAddition, setShowAddition] = useState(false);

    const FiltersArrayFromContext = useContext(FiltersArrayContext);

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    function imageFullScreen({target}) {
        if(!document.fullscreenElement) {
            target.requestFullscreen()
            .catch((error) => console.log(error));
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <>
            <div className="filter" id={id}>
                <img id={id} src={src} onClick={imageFullScreen}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={minPlaceholder}
                        onBlur={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.trim() === '') {
                                FiltersArrayFromContext[4] = '';
                            } else {
                                FiltersArrayFromContext[4] = inputValue + '-01-' + '01';
                            }
                        }}
                    />
                    <span className="separator">-</span>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={maxPlaceholder}
                        onBlur={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.trim() === '') {
                                FiltersArrayFromContext[5] = '';
                            } else {
                                FiltersArrayFromContext[5] = inputValue + '-12-' + '31';
                            }
                        }}
                    />
                </div>
                <div className="text-addition" id={id}>
                    <button className='open-addition' onClick={openAddition}>
                        {showAddition ? 'Закрыть поясение' : 'Открыть пояснение'}
                    </button> 
                    {
                        showAddition
                        &&
                        <FilterAddition
                            bigAdditionText = {description.bigAddition}
                            smallAdditionText = {description.smallAddition}
                        />
                    }
                </div>
            </div>
        </>  
    );
}



function RangeFilterPrice({ id='', src='', filterName, minPlaceholder, maxPlaceholder }) {
    const [showAddition, setShowAddition] = useState(false);

    const FiltersArrayFromContext = useContext(FiltersArrayContext);

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    function imageFullScreen({target}) {
        if(!document.fullscreenElement) {
            target.requestFullscreen()
            .catch((error) => console.log(error));
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <>
            <div className="filter" id={id}>
                <img id={id} src={src} onClick={imageFullScreen}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={minPlaceholder}
                        onBlur={(e) => FiltersArrayFromContext[6] = e.target.value}
                    />
                    <span className="separator">-</span>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={maxPlaceholder}
                        onBlur={(e) => FiltersArrayFromContext[7] = e.target.value}
                    />
                </div>
                <div className="text-addition" id={id}>
                    <button className='open-addition' onClick={openAddition}>
                        {showAddition ? 'Закрыть поясение' : 'Открыть пояснение'}
                    </button> 
                    {
                        showAddition
                        &&
                        <FilterAddition
                            bigAdditionText = {description.bigAddition}
                            smallAdditionText = {description.smallAddition}
                        />
                    }
                </div>
            </div>
        </>  
    );
}


function FilterAddition({bigAdditionText, smallAdditionText}) {
    return (
        <>
            <p className='big-addition'>
                {bigAdditionText}
            </p>
            <p className='small-addition'>
                {
                    smallAdditionText.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))
                }
            </p>
        </>
    )
}