import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import { AdditionContext, filtersDescription } from './AdditionContext';

import './styles/MainPageContent.css'

import dcImage from '../../images/dc2.jpg'
import w211Image from '../../images/w211.jpg'
import rollsRoyce from '../../images/rollsRoyce.jpg'

export default function MainPageContent() {
    return(
        <div className="main-page">
            <AdditionContext value={filtersDescription}>
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
                            filterName={"Выберете концерн, который вы предпочитаете"}
                            itemOne={"VAG"}
                            itemTwo={"PSA"}
                            itemThree={"Toyota Motors"}
                            itemFour={"FCA"}
                            itemFive={"BMW Group"}                            
                        />
                        <Filter 
                            id="car"
                            src={w211Image}
                            filterName={"Выберете марку автомобиля"}
                        />
                        <Filter 
                            id="bodyType" 
                            src={rollsRoyce} 
                            filterName={"Выберите тип кузова"}>
                        </Filter>
                    </section>
                </div>
                <Footer />
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
                            bigAdditionText= {description.bigAddition}
                            smallAdditionText= {description.smallAddition}
                        />
                    }
                </div>
            </div>
        </>
    )
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

// можно создать массив или объект из разных занчений для фильтра, и закидывать их через контекст в пропсы фильтра. - сделано
// (добавлять их к bigAdditionText или smallAdditionText) - сделано
// в зависимости от id фильтра можно подтягивать данные из массива filtersDescription - как ?? - сделано