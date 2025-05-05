import React from 'react';
import { createContext } from 'react';
import {useState, useContext} from 'react';

import Header from '../header/Header';
import ShowAll from './components/show-all/ShowAll';
import AddEngine from './components/add-engine/AddEngine';
import AddCar from './components/add-car/AddCar';
import AddCarDescription from './components/add-car-description/AddCarDescription';
import AddProblem from './components/add-problem/AddProblem';
import AddProblemToCar from './components/AddProblemToCar';
import UpdateAndDeleteCar from './components/UpdateAndDeleteCar';
import AddPhoto from './components/AddPhoto';

import Footer from '../footer/Footer';

import './styles/AdminPage.css';

export default function AdminPage() {
    return(
        <main>
            <Header />
            <div className="adminpage">
                <div className="overlay"></div>
                <div className="main-container-admin">
                    <div className="warning-messages-container">
                        <p className="warning-message"><span>Обратите внимание</span>, что перед добавлением автомобиля, необходимо добавить двигатель от него, 
                            если таковой имеется, приступить к добавлению автомбиля.</p>
                        <p className="ps-message"><span>Список</span> всех <span className="alter">двигателей</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все двигатели"</p>
                        <p className="ps-message-cars"><span>Список</span> всех <span className="alter">автомобилей</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все автомобили"</p>
                        <p className="ps-message-problems"><span>Список</span> всех <span className="alter">проблем</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все проблемы"</p>
                        <p className="ps-message-car-problems"><span>Список</span> всех <span className="alter">проблем автомобилей</span> и их данные можно вывести по нажатию кнопки - "Просмотреть все проблемы автомобилей"</p>
                    </div>
                    <ShowAll />
                    <h1 className='separator-message'>Панель управления</h1>
                    <AddEngine />
                    <AddCar />
                    <AddCarDescription />
                    <AddProblem />
                    <AddProblemToCar />
                    <UpdateAndDeleteCar />
                    <AddPhoto />
                </div>
            </div>
            <Footer />
        </main>
    )
}