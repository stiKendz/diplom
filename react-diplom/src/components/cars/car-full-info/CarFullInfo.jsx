import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import Header from '../../header/Header'
import Footer from '../../footer/Footer'

import './styles/CarFullInfo.css'

import dc2 from '../../../images/dc2.jpg';

export default function CarFullInfo() {
    return(
        <main>
            <Header />
            <div className="car-full-info-container">
                <h3>Полная информация об автомобиле</h3>
                <div className="image-container">
                    <img src={dc2}/>
                </div>
                <div className="car-info-container">
                    <div className="short-description-container">
                        <div className="concern">JDM</div>
                        <div className="brand">Honda</div>
                        <div className="model-name">Integra</div>
                        <div className="model-number">DC2</div>
                        <div className="generation">2</div>
                        <div className="vehical">FWD</div>
                        <div className="gearbox">MT</div>
                        <div className="body-type">Sedan</div>
                        <div className="release-date">2001</div>
                        <div className="end-release-date">2004</div>
                        <div className="price">400.000 - 1.200.000</div>
                        <div className="engine-container">
                            <Engine />
                        </div>
                    </div>
                    <div className="car-description-container">
                        <div className="description">Описание автомобиля</div>
                    </div>
                    <div className="car-problems-container">
                        <div className="name">Название проблемы</div>
                        <div className="short-description">Краткое описание проблемы</div>
                        <div className="how-to-fix">Как исправить проблему</div>
                        <div className="fix-price">Цена исправления проблемы</div>
                        <div className="buttons-container">
                            <button type='button'>Предидущая проблема</button>
                            <button type='button'>Следующая проблема</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export function Engine() {
    return(
        <>
            <div className="engine-info">
                <div className="serial-name">4g18</div>
                <div className="size">1.6</div>
                <div className="type">Роторный</div>
                <div className="engine_nano">Крутящий момент 200nm</div>
                <div className="engine_horse_power">150 л.с</div>
                <div className="engine_expenditure_city">Расход по городу - 8.2</div>
                <div className="engine_expenditure_track">Расход по трассе 6.2</div>
                <div className="camshaft-system">Система распредвалов - DOHC</div>
            </div>
        </>
    )
}