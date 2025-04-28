import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import { AdditionContext, filtersDescription } from './AdditionContext';
import { TokenContext } from '../contexts/TokenContext';

import './styles/MainPageContent.css'

import dcImage from '../../images/dc2.jpg'
import w211Image from '../../images/w211.jpg'
import rollsRoyce from '../../images/rollsRoyce.jpg'

export default function MainPageContent() {
    const navigate = useNavigate();

    return(
        <div className="main-page">
            <AdditionContext value={filtersDescription}>
                <Header />
                <div className="main-container">
                    <section className="hello-card">
                        <p className="hello-message">Сделайте правильный выбор в мире автомобилей</p>
                        <p className="information-message"> 
                            <span onClick={() => navigate('sing-in', {replace: false})}>Войдите </span> 
                            или 
                            <span onClick={() => navigate('sing-up', {replace: false})}> зарегистрируйтесь </span>
                            для использования приложения
                        </p>
                    </section>
                    <section className="filters-container">
                        <Filter
                            id="concern"
                            src={dcImage}
                            filterName={"Выберете концерн, который вы предпочитаете"}
                            itemOne={"VAG"}
                            itemTwo={"PSA"}
                            itemThree={"Toyota Motors"}
                            itemFour={"FCA"}
                            itemFive={"BMW Group"}                            
                        />
                        <Filter 
                            id="company"
                            src={w211Image}
                            filterName={"Выберете марку автомобиля"}
                            itemOne={"Peugeot"}
                            itemTwo={"Honda"}
                            itemThree={"Mercedes-Benz"}
                        />
                        <Filter 
                            id="gearbox" 
                            src={rollsRoyce} 
                            filterName={"Выберите тип КПП"}
                            itemOne={"MT"}
                            itemTwo={"AT"}
                            itemThree={"Вариатор"}
                            itemFour={"Робот"}
                        />
                        <Filter 
                            id="vehicle" 
                            src={rollsRoyce} 
                            filterName={"Выберите привод"}
                            itemOne={"FWD"}
                            itemTwo={"RWD"}
                            itemThree={"AWD"}
                        />
                        <Filter 
                            id="bodyType" 
                            src={rollsRoyce} 
                            filterName={"Выберите тип кузова"}
                            itemOne={"Седан"}
                            itemTwo={"Хэтчбек"}
                            itemThree={"Универсал"}
                        />
                        <RangeFilter 
                            id='release'
                            src={dcImage}
                            filterName={"Выберите год выпуска"}
                            minPlaceholder={'1980'}
                            maxPlaceholder={'2025'}
                        />
                        <RangeFilter 
                            id='price'
                            src={dcImage}
                            filterName={"Выберите цену"}
                            minPlaceholder={'60.000'}
                            maxPlaceholder={'10.000.000'}
                        />
                    </section>
                </div>
                <Footer />
                <Outlet />
            </AdditionContext>
        </div> 
    )
}


function Filter({id='', src='', filterName, itemOne, itemTwo, itemThree, itemFour, itemFive}) {
    const [showAddition, setShowAddition] = useState('false');

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    return(
        <>
            <div className="filter" id={id}>
                <img id={id} src={src}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    {itemOne && <div className='item' id={id}>{itemOne}</div>}
                    {itemTwo && <div className='item' id={id}>{itemTwo}</div>}
                    {itemThree && <div className='item' id={id}>{itemThree}</div>}
                    {itemFour && <div className='item' id={id}>{itemFour}</div>}
                    {itemFive && <div className='item' id={id}>{itemFive}</div>}
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


function RangeFilter({ id='', src='', filterName, minPlaceholder, maxPlaceholder }) {
    const [showAddition, setShowAddition] = useState('false');

    const filters = useContext(AdditionContext);
    const description = filters.find(filter => filter.name === id);

    function openAddition() {
        setShowAddition(current => !current)
    }

    return (
        <>
            <div className="filter" id={id}>
                <img id={id} src={src}></img>
                <p className="description" id={id}>{filterName}</p>
                <div className="items" id={id}>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={minPlaceholder}
                    />
                    <span className="separator">-</span>
                    <input
                        id={id}
                        type="text"
                        className="range"
                        placeholder={maxPlaceholder}
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