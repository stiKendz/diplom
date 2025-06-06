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

import carBrand from '../../images/main-page-images/free-icon-cars-13833572.png';
import carGearbox from '../../images/main-page-images/free-icon-manual-transmission-6052483.png';
import carBodyType from '../../images/main-page-images/free-icon-body-car-16858484.png';
import carVehicle from '../../images/main-page-images/free-icon-four-wheel-drive-2520422.png';
import carYearInterval from '../../images/main-page-images/free-icon-time-management-5188254.png';
import carPriceInterval from '../../images/main-page-images/free-icon-price-tag-2657935.png';

import "flag-icons/css/flag-icons.min.css";


const FiltersArrayContext = createContext();

export default function MainPageContent() {
    const navigate = useNavigate();
    const [token, getToken] = useState(() => window.localStorage.getItem('token'));

    // const [showResults, setShowResults] = useState(false);
    // const [filteredCarsArray, setFilteredCars] = useState([]);

    // let filtersArray = [];
   
    const { showResults, setShowResults, filteredCarsArray, setFilteredCars, filtersArray, setFiltersArray } = UseFilteredCarsContext();
     useEffect(() => {
        setFilteredCars();
        console.log(filtersArray);
        console.log(showResults);

        if (filtersArray.length >= 8) {
            getFilteredCars();
        }
    },[])


    const cars = useCars();

    function correctDate(stringDate) {
        return stringDate.split('T')[0];
    }


    const getFilteredCars = async () => {
        // const rangeInputs = document.querySelectorAll('input.range');
        // rangeInputs.forEach(input => {
        //     input.value = '';
        // });

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
                                                src={carBrand}
                                                filterName={"Выберете марку автомобиля"}
                                                itemOne={"Любая"}

                                                itemOneRussia={"ГАЗ"}
                                                itemTwoRussia={"ВАЗ"}
                                                itemThreeRussia={"ЗИЛ"}
                                                itemFourRussia={"Лада"}
                                                itemFiveRussia={"КамАЗ"}
                                                itemSixRussia={"ИЖ"}
                                                itemSevenRussia={"Ока"}
                                                itemEigthRussia={"Москвич"}
                                                itemNineRussia={"УАЗ"}

                                                itemOneFrance={"Peugeot"}
                                                itemTwoFrance={"Citroen"}
                                                itemThreeFrance={"Renault"}
                                                itemFourFrance={"Alpine"}
                                                itemFiveFrance={"Bugatti"}

                                                itemOneJapan={"Acura"}
                                                itemTwoJapan={"Datsun"}
                                                itemThreeJapan={"Honda"}
                                                itemFourJapan={"Infiniti"}
                                                itemFiveJapan={"Lexus"}
                                                itemSixJapan={"Mazda"}
                                                itemSevenJapan={"Mitsubishi"}
                                                itemEigthJapan={"Nissan"}
                                                itemNineJapan={"Subaru"}
                                                itemTenJapan={"Suzuki"}
                                                itemElevenJapan={"Toyota"}

                                                itemOneUSA={"Buick"}
                                                itemTwoUSA={"Cadillac"}
                                                itemThreeUSA={"Chevrolet"}
                                                itemFourUSA={"Chrysler"}
                                                itemFiveUSA={"Dodge"}
                                                itemSixUSA={"Ford"}
                                                itemSevenUSA={"Hummer"}
                                                itemEigthUSA={"Jeep"}
                                                itemNineUSA={"Lincoln"}
                                                itemTenUSA={"Pontiac"}
                                                itemElevenUSA={"Tesla"}

                                                itemOneKorea={"Daewoo"}
                                                itemTwoKorea={"Genesis"}
                                                itemThreeKorea={"Hyundai"}
                                                itemFourKorea={"Kia"}
                                                itemFiveKorea={"SsangYong"}

                                                itemOneSweden={"Saab"}
                                                itemTwoSweden={"Scania"}
                                                itemThreeSweden={"Volvo"}

                                                itemOneCzech={"Skoda"}

                                                itemOneChina={"Changan"}
                                                itemTwoChina={"Chery"}
                                                itemThreeChina={"Exeed"}
                                                itemFourChina={"Geely"}
                                                itemFiveChina={"Haval"}
                                                itemSixChina={"JAC"}
                                                itemSevenChina={"Jaecoo"}
                                                itemEigthChina={"Jetour"}
                                                itemNineChina={"Lixiang"}
                                                itemTenChina={"Omoda"}
                                                itemElevenChina={"Zeekr"}

                                                itemOneBritain={"Bentley"}
                                                itemTwoBritain={"Jaguar"}
                                                itemThreeBritain={"Land Rover"}
                                                itemFourBritain={"Rover"}
                                                
                                                itemOneGermany={"Audi"}
                                                itemTwoGermany={"BMW"}
                                                itemThreeGermany={"MAN"}
                                                itemFourGermany={"Maybach"}
                                                itemFiveGermany={"Mercedes-Benz"}
                                                itemSixGermany={"Opel"}
                                                itemSevenGermany={"Porche"}
                                                itemEigthGermany={"Volkswagen"}

                                                itemOneItaly={"Ferrari"}
                                                itemTwoItaly={"Fiat"}
                                                itemThreeItaly={"Iveco"}
                                                itemFourItaly={"Lamborghini"}
                                            />
                                            <FilterGearbox
                                                id="gearbox" 
                                                src={carGearbox} 
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
                                                src={carBodyType} 
                                                filterName={"Выберите тип кузова"}
                                                itemOne={"Любой"}
                                                itemTwo={"Седан"}
                                                itemThree={"Хэтчбек"}
                                                itemFour={"Универсал"}
                                                itemFive={"Купе"}
                                                itemSix={"Кроссовер"}
                                                itemSeven={"Кабриолет"}
                                            />
                                            <FilterVehicle 
                                                id="vehicle" 
                                                src={carVehicle} 
                                                filterName={"Выберите привод"}
                                                itemOne={"Любой"}
                                                itemTwo={"FWD"}
                                                itemThree={"RWD"}
                                                itemFour={"AWD"}
                                                itemFive={"Подключаемый полный"}
                                            />
                                            <RangeFilterRelease 
                                                id='release'
                                                src={carYearInterval}
                                                filterName={"Выберите год выпуска"}
                                                minPlaceholder={'1980'}
                                                maxPlaceholder={'2025'}
                                            />
                                            <RangeFilterPrice
                                                id='price'
                                                src={carPriceInterval}
                                                filterName={"Выберите цену"}
                                                minPlaceholder={'60000'}
                                                maxPlaceholder={'10000000'} 
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
                                                                                car_vehicle={car.car_vehicle}
                                                                                gearbox={car.gearbox}
                                                                                body_type={car.body_type}
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



function FilterCompany({
    id='', 
    src='', 
    filterName, 
    itemOne, 
    itemOneRussia,
    itemTwoRussia,
    itemThreeRussia,
    itemFourRussia,
    itemFiveRussia,
    itemSixRussia,
    itemSevenRussia,
    itemEigthRussia,
    itemNineRussia,
    itemOneFrance,
    itemTwoFrance,
    itemThreeFrance,
    itemFourFrance,
    itemFiveFrance,
    itemOneJapan,
    itemTwoJapan,
    itemThreeJapan,
    itemFourJapan,
    itemFiveJapan,
    itemSixJapan,
    itemSevenJapan,
    itemEigthJapan,
    itemNineJapan,
    itemTenJapan,
    itemElevenJapan,
    itemOneUSA,
    itemTwoUSA,
    itemThreeUSA,
    itemFourUSA,
    itemFiveUSA,
    itemSixUSA,
    itemSevenUSA,
    itemEigthUSA,
    itemNineUSA,
    itemTenUSA,
    itemElevenUSA,
    itemOneKorea,
    itemTwoKorea,
    itemThreeKorea,
    itemFourKorea,
    itemOneSweden,
    itemTwoSweden,
    itemThreeSweden,
    itemOneCzech,
    itemOneChina,
    itemTwoChina,
    itemThreeChina,
    itemFourChina,
    itemFiveChina,
    itemSixChina,
    itemSevenChina,
    itemEigthChina,
    itemNineChina,
    itemTenChina,
    itemElevenChina,
    itemOneBritain,
    itemTwoBritain,
    itemThreeBritain,
    itemFourBritain,
    itemOneGermany,
    itemTwoGermany,
    itemThreeGermany,
    itemFourGermany,
    itemFiveGermany,
    itemSixGermany,
    itemSevenGermany,
    itemEigthGermany,
    itemOneItaly,
    itemTwoItaly,
    itemThreeItaly,
    itemFourItaly,
    }) 
{
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
                <div className="items company" id={id}>
                    {itemOne && <div className='item any-brand' id={id} onClick={() => FiltersArrayFromContext[0] = itemOne}>{itemOne}</div>}

                    <span className='country-name'>Российские</span>
                    {itemOneRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneRussia}><span className="fi fi-ru"></span>{itemOneRussia}</div>}
                    {itemTwoRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoRussia}><span className="fi fi-ru"></span>{itemTwoRussia}</div>}
                    {itemThreeRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeRussia}><span className="fi fi-ru"></span>{itemThreeRussia}</div>}
                    {itemFourRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourRussia}><span className="fi fi-ru"></span>{itemFourRussia}</div>}
                    {itemFiveRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFiveRussia}><span className="fi fi-ru"></span>{itemFiveRussia}</div>}
                    {itemSixRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSixRussia}><span className="fi fi-ru"></span>{itemSixRussia}</div>}
                    {itemSevenRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSevenRussia}><span className="fi fi-ru"></span>{itemSevenRussia}</div>}
                    {itemEigthRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemEigthRussia}><span className="fi fi-ru"></span>{itemEigthRussia}</div>}
                    {itemNineRussia && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemNineRussia}><span className="fi fi-ru"></span>{itemNineRussia}</div>}

                    <span className='country-name'>Француские</span>
                    {itemOneFrance && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneFrance}><span class="fi fi-fr"></span>{itemOneFrance}</div>}
                    {itemTwoFrance && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoFrance}><span class="fi fi-fr"></span>{itemTwoFrance}</div>}
                    {itemThreeFrance && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeFrance}><span class="fi fi-fr"></span>{itemThreeFrance}</div>}
                    {itemFourFrance && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourFrance}><span class="fi fi-fr"></span>{itemFourFrance}</div>}
                    {itemFiveFrance && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFiveFrance}><span class="fi fi-fr"></span>{itemFiveFrance}</div>}

                    <span className='country-name'>Японские</span>
                    {itemOneJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneJapan}><span class="fi fi-jp"></span>{itemOneJapan}</div>}
                    {itemTwoJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoJapan}><span class="fi fi-jp"></span>{itemTwoJapan}</div>}
                    {itemThreeJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeJapan}><span class="fi fi-jp"></span>{itemThreeJapan}</div>}
                    {itemFourJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourJapan}><span class="fi fi-jp"></span>{itemFourJapan}</div>}
                    {itemFiveJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFiveJapan}><span class="fi fi-jp"></span>{itemFiveJapan}</div>}
                    {itemSixJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSixJapan}><span class="fi fi-jp"></span>{itemSixJapan}</div>}
                    {itemSevenJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSevenJapan}><span class="fi fi-jp"></span>{itemSevenJapan}</div>}
                    {itemEigthJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemEigthJapan}><span class="fi fi-jp"></span>{itemEigthJapan}</div>}
                    {itemNineJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemNineJapan}><span class="fi fi-jp"></span>{itemNineJapan}</div>}
                    {itemTenJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTenJapan}><span class="fi fi-jp"></span>{itemTenJapan}</div>}
                    {itemElevenJapan && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemElevenJapan}><span class="fi fi-jp"></span>{itemElevenJapan}</div>}

                    <span className='country-name'>Американские</span>
                    {itemOneUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneUSA}><span class="fi fi-us"></span>{itemOneUSA}</div>}
                    {itemTwoUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoUSA}><span class="fi fi-us"></span>{itemTwoUSA}</div>}
                    {itemThreeUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeUSA}><span class="fi fi-us"></span>{itemThreeUSA}</div>}
                    {itemFourUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourUSA}><span class="fi fi-us"></span>{itemFourUSA}</div>}
                    {itemFiveUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFiveUSA}><span class="fi fi-us"></span>{itemFiveUSA}</div>}
                    {itemSixUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSixUSA}><span class="fi fi-us"></span>{itemSixUSA}</div>}
                    {itemSevenUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSevenUSA}><span class="fi fi-us"></span>{itemSevenUSA}</div>}
                    {itemEigthUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemEigthUSA}><span class="fi fi-us"></span>{itemEigthUSA}</div>}
                    {itemNineUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemNineUSA}><span class="fi fi-us"></span>{itemNineUSA}</div>}
                    {itemTenUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTenUSA}><span class="fi fi-us"></span>{itemTenUSA}</div>}
                    {itemElevenUSA && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemElevenUSA}><span class="fi fi-us"></span>{itemElevenUSA}</div>}

                    <span className='country-name'>Корейские</span>
                    {itemOneKorea && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneKorea}><span class="fi fi-kr"></span>{itemOneKorea}</div>}
                    {itemTwoKorea && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoKorea}><span class="fi fi-kr"></span>{itemTwoKorea}</div>}
                    {itemThreeKorea && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeKorea}><span class="fi fi-kr"></span>{itemThreeKorea}</div>}
                    {itemFourKorea && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourKorea}><span class="fi fi-kr"></span>{itemFourKorea}</div>}

                    <span className='country-name'>Шведские</span>
                    {itemOneSweden && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneSweden}><span class="fi fi-se"></span>{itemOneSweden}</div>}
                    {itemTwoSweden && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoSweden}><span class="fi fi-se"></span>{itemTwoSweden}</div>}
                    {itemThreeSweden && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeSweden}><span class="fi fi-se"></span>{itemThreeSweden}</div>}

                    <span className='country-name'>Чешские</span>
                    {itemOneCzech && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneCzech}><span class="fi fi-cz"></span>{itemOneCzech}</div>}

                    <span className='country-name'>Китайские</span>
                    {itemOneChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneChina}><span class="fi fi-cn"></span>{itemOneChina}</div>}
                    {itemTwoChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoChina}><span class="fi fi-cn"></span>{itemTwoChina}</div>}
                    {itemThreeChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeChina}><span class="fi fi-cn"></span>{itemThreeChina}</div>}
                    {itemFourChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourChina}><span class="fi fi-cn"></span>{itemFourChina}</div>}
                    {itemFiveChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFiveChina}><span class="fi fi-cn"></span>{itemFiveChina}</div>}
                    {itemSixChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSixChina}><span class="fi fi-cn"></span>{itemSixChina}</div>}
                    {itemSevenChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSevenChina}><span class="fi fi-cn"></span>{itemSevenChina}</div>}
                    {itemEigthChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemEigthChina}><span class="fi fi-cn"></span>{itemEigthChina}</div>}
                    {itemNineChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemNineChina}><span class="fi fi-cn"></span>{itemNineChina}</div>}
                    {itemTenChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTenChina}><span class="fi fi-cn"></span>{itemTenChina}</div>}
                    {itemElevenChina && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemElevenChina}><span class="fi fi-cn"></span>{itemElevenChina}</div>}

                    <span className='country-name'>Британские</span>
                    {itemOneBritain && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneBritain}><span class="fi fi-sh"></span>{itemOneBritain}</div>}
                    {itemTwoBritain && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoBritain}><span class="fi fi-sh"></span>{itemTwoBritain}</div>}
                    {itemThreeBritain && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeBritain}><span class="fi fi-sh"></span>{itemThreeBritain}</div>}
                    {itemFourBritain && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourBritain}><span class="fi fi-sh"></span>{itemFourBritain}</div>}
                    
                    <span className='country-name'>Немецкие</span>
                    {itemOneGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneGermany}><span class="fi fi-de"></span>{itemOneGermany}</div>}
                    {itemTwoGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoGermany}><span class="fi fi-de"></span>{itemTwoGermany}</div>}
                    {itemThreeGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeGermany}><span class="fi fi-de"></span>{itemThreeGermany}</div>}
                    {itemFourGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourGermany}><span class="fi fi-de"></span>{itemFourGermany}</div>}
                    {itemFiveGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFiveGermany}><span class="fi fi-de"></span>{itemFiveGermany}</div>}
                    {itemSixGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSixGermany}><span class="fi fi-de"></span>{itemSixGermany}</div>}
                    {itemSevenGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemSevenGermany}><span class="fi fi-de"></span>{itemSevenGermany}</div>}
                    {itemEigthGermany && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemEigthGermany}><span class="fi fi-de"></span>{itemEigthGermany}</div>}
                                                
                    <span className='country-name'>Итальянские</span>
                    {itemOneItaly && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemOneItaly}><span class="fi fi-it"></span>{itemOneItaly}</div>}
                    {itemTwoItaly && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemTwoItaly}><span class="fi fi-it"></span>{itemTwoItaly}</div>}
                    {itemThreeItaly && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemThreeItaly}><span class="fi fi-it"></span>{itemThreeItaly}</div>}
                    {itemFourItaly && <div className='item' id={id} onClick={() => FiltersArrayFromContext[0] = itemFourItaly}><span class="fi fi-it"></span>{itemFourItaly}</div>}                
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
                    {itemOne && <div className='item any-gearbox' id={id} onClick={() => FiltersArrayFromContext[1] = itemOne}>{itemOne}</div>}
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



function FilterBodyType({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive, itemSix, itemSeven}) {
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
                    {itemOne && <div className='item any-bodytype' id={id} onClick={() => FiltersArrayFromContext[2] = itemOne}>{itemOne}</div>}
                    {itemTwo && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemTwo}>{itemTwo}</div>}
                    {itemThree && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemThree}>{itemThree}</div>}
                    {itemFour && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemFour}>{itemFour}</div>}
                    {itemFive && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemFive}>{itemFive}</div>}
                    {itemSix && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemSix}>{itemSix}</div>}
                    {itemSeven && <div className='item' id={id} onClick={() => FiltersArrayFromContext[2] = itemSeven}>{itemSeven}</div>}
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
                    {itemOne && <div className='item any-vehicle' id={id} onClick={() => FiltersArrayFromContext[3] = itemOne}>{itemOne}</div>}
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