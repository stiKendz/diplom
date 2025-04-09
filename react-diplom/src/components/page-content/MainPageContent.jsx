import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import './styles/MainPageContent.css'

import dcImage from '../../images/dc2.jpg'
import w211Image from '../../images/w211.jpg'
import rollsRoyce from '../../images/rollsRoyce.jpg'

export default function MainPageContent() {
    return(
        <div className="main-page">
            <Header />
            <div className="main-container">
                <section className="hello-card">
                    <p className="hello-message">Сделайте правильный выбор в мире автомобилей</p>
                    <p className="information-message"> 
                        <span> Войдите </span> 
                        или 
                        <span> зарегистрируйтесь </span>
                        для использования приложения
                    </p>
                </section>
                <section className="filters-container">
                    <Filter 
                        id="concern"
                        src={dcImage}
                        filterDesctiption={"Выберете концерн, который вы предпочитаете"}
                        itemOne={"VAG"}
                        itemTwo={"PSA"}
                        itemThree={"Toyota Motors"}
                    />
                    <Filter 
                        id="car"
                        src={w211Image}
                    />
                    <Filter 
                        id="model"
                        src={rollsRoyce}
                    />
                </section>
            </div>
            <Footer />
        </div> 
    )
}


function Filter({id='', src='', filterDesctiption, itemOne, itemTwo, itemThree, itemFour, itemFive}) {
    const [showAddition, setShowAddition] = useState('false');

    function openAddition() {
        setShowAddition(current => !current)
    }

    return(
        <>
            <div className="filter" id={id}>
                <img id={id} src={src}></img>
                <p className="description" id={id}>{filterDesctiption}</p>
                <div className="items" id={id}>
                    <div className="item" id={id}>{itemOne}</div>
                    <div className="item" id={id}>{itemTwo}</div>
                    <div className="item" id={id}>{itemThree}</div>
                </div>
                <div className="text-addition" id={id}>
                    <button className='open-addition' onClick={openAddition}>
                        {showAddition ? 'Закрыть поясение' : 'Открыть пояснение'}
                    </button> 
                    {
                        showAddition
                        &&
                        <FilterAddition 
                            bigAdditionText={
                                `Этот фильтр помогает выбрать автомобиль из 
                                конкретной группы компаний-производителей`
                            }
                            smallAdditionText={
                                `VAG (Volkswagen Group) — немецкий концерн, включающий марки: Volkswagen, Audi, Skoda, Seat, 
                                Porsche и другие.
                                Toyota Motors — японский производитель, включающий марки: Toyota, Lexus, Daihatsu
                                PSA (Stellantis) — европейский концерн, включающий марки: Peugeot, Citroën, Opel, DS`
                            }
                        />
                    }
                </div>
            </div>
        </>
    )
}

function FilterAddition({id ='', bigAdditionText, smallAdditionText}) {
    return (
        <>
            <p className='big-addition' id={id}>
                {bigAdditionText}
            </p>
            <p className='small-addition' id={id}>       
                VAG (Volkswagen Group) — немецкий концерн, включающий марки: Volkswagen, Audi, Skoda, Seat, Porsche и другие
                Toyota Motors — японский производитель, включающий марки: Toyota, Lexus, Daihatsu
                PSA (Stellantis) — европейский концерн, включающий марки: Peugeot, Citroën, Opel, DS
            </p>
        </>
    )
}