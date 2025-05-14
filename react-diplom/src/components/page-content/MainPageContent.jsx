import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import CarCard from '../cars/car-card/CarCard';

import { AdditionContext, filtersDescription } from './AdditionContext';
import { TokenContext } from '../contexts/TokenContext';

import { useCars } from '../contexts/CarsContext';

import './styles/MainPageContent.css'

import dcImage from '../../images/dc2.jpg'
import w211Image from '../../images/w211.jpg'
import rollsRoyce from '../../images/rollsRoyce.jpg'

const FiltersArrayContext = createContext();

export default function MainPageContent() {
    const navigate = useNavigate();
    const [token, getToken] = useState(() => window.localStorage.getItem('token'));

    // const [concern, SetConcern] = useState('');
    // const [brand, SetCompanyItem] = useState('');
    // const [gearbox, Setgearbox] = useState('');
    // const [car_vehicle, SetVehicle] = useState('');
    // const [body_type, SetBodyType] = useState('');
    // const [release_date, SetStartReleaseDate] = useState('');
    // const [end_release_date, SetEndReleaseDate] = useState('');
    // const [price_start, SetStartPrice] = useState('');
    // const [price_end, SetEndPrice] = useState('');

    const cars = useCars();

    let filtersArray = [];

    const showFilters = () => {
        return console.log('Массив фильтров ' + filtersArray.map((element) => element));
    };

    const dropFilters = () => {
        filtersArray.length = 0;
        return console.log('Массив фильтров ' + filtersArray);
    };

    function correctDate(stringDate) {
        return stringDate.split('T')[0];
    }


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
                                                или 
                                                <span onClick={() => navigate('sing-up', {replace: false})}> зарегистрируйтесь </span>
                                                для использования приложения
                                            </p>
                                        </section>
                                    </>
                                ) : (
                                    <div className='space'></div>   
                                )
                            }
                            <section className="filters-container">
                                {/* <FilterConcern
                                    id="concern"
                                    src={dcImage}
                                    filterName={"Выберете концерн, который вы предпочитаете"}
                                    itemOne={"VAG"}
                                    itemTwo={"PSA"}
                                    itemThree={"Toyota Motors"}
                                    itemFour={"FCA"}
                                    itemFive={"BMW Group"}                     
                                />
                                <FilterCompany
                                    id="company"
                                    src={w211Image}
                                    filterName={"Выберете марку автомобиля"}
                                    itemOne={"Peugeot"}
                                    itemTwo={"Honda"}
                                    itemThree={"Mercedes-Benz"}
                                /> */}
                                <FilterGearbox
                                    id="gearbox" 
                                    src={rollsRoyce} 
                                    filterName={"Выберите тип КПП"}
                                    itemOne={"Механическая (MT)"}
                                    itemTwo={"Автоматическая (AT)"}
                                    itemThree={"Вариатор (CVT)"}
                                    itemFour={"Роботизированная (AMT/DSG)"}
                                    itemFive={"Гибридая"}
                                />
                                <FilterVehicle 
                                    id="vehicle" 
                                    src={rollsRoyce} 
                                    filterName={"Выберите привод"}
                                    itemOne={"FWD"}
                                    itemTwo={"RWD"}
                                    itemThree={"AWD"}
                                    itemFour={"Подключаемый полный"}
                                />
                                <FilterBodyType
                                    id="bodyType" 
                                    src={rollsRoyce} 
                                    filterName={"Выберите тип кузова"}
                                    itemOne={"Седан"}
                                    itemTwo={"Хэтчбек"}
                                    itemThree={"Универсал"}
                                    itemFour={"Купе"}
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
                                <button 
                                    className='get-results-button'
                                    onClick={showFilters}
                                >
                                    Показать результаты
                                </button>
                                <button 
                                    className='drop-results-button'
                                    onClick={dropFilters}
                                >
                                    Сбросить результаты
                                </button>
                                <h1 className='result-message'>
                                    Вам могут подойти следующие автомобили
                                </h1>
                                <div className="results-cars">
                                    {
                                        Array.isArray(cars) && cars.length > 0 ? (
                                            cars.map((car, index) => (
                                                <CarCard key={index} 
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
                                    <h2>Разделитель</h2>
                                    {
                                        Array.isArray(cars) && cars.length > 0 ? (
                                            cars.map((car, index) => (
                                                <div key={index}>
                                                    <div className="brand">Марка: {car.brand}</div>
                                                    <div className="model-name">Модель: {car.model_name}-{car.model_number}</div>
                                                    {/* <div className="vehical">Привод: {car.car_vehicle}</div> */}
                                                    {/* <div className="gearbox">Тип КПП: {car.gearbox}</div> */}
                                                    {/* <div className="body-type">Тип кузова: {car.body_type}</div> */}
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
                            </div>
                        </div>
                        <Footer />
                    </div>
                        <Outlet />
                </FiltersArrayContext>
            </AdditionContext>
        </TokenContext.Provider>
    )
}


function FilterGearbox({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive}) {
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


function FilterVehicle({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive}) {
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


function FilterBodyType({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive}) {
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
                    {itemOne && <div className='item' id={id} onClick={() => FiltersArrayFromContext[4] = itemOne}>{itemOne}</div>}
                    {itemTwo && <div className='item' id={id} onClick={() => FiltersArrayFromContext[4] = itemTwo}>{itemTwo}</div>}
                    {itemThree && <div className='item' id={id} onClick={() => FiltersArrayFromContext[4] = itemThree}>{itemThree}</div>}
                    {itemFour && <div className='item' id={id} onClick={() => FiltersArrayFromContext[4] = itemFour}>{itemFour}</div>}
                    {itemFive && <div className='item' id={id} onClick={() => FiltersArrayFromContext[4] = itemFive}>{itemFive}</div>}
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
                        onBlur={(e) => FiltersArrayFromContext[5] = e.target.value}
                    />
                    <span className="separator">-</span>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={maxPlaceholder}
                        onBlur={(e) => FiltersArrayFromContext[6] = e.target.value}
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
                        onBlur={(e) => FiltersArrayFromContext[7] = e.target.value}
                    />
                    <span className="separator">-</span>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={maxPlaceholder}
                        onBlur={(e) => FiltersArrayFromContext[8] = e.target.value}
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