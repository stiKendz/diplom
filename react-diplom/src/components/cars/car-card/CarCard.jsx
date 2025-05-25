import React from 'react';
import { createContext } from 'react';
import { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import CarFullInfo from '../car-full-info/CarFullInfo';
import './styles/CarCard.css';

import dc2 from '../../../images/dc2.jpg';

export default function CarCard({
    car_id,
    brand, 
    model_name,
    model_number,
    car_vehicle, 
    gearbox, 
    body_type, 
    release_date, 
    end_release_date, 
    price_start, 
    price_end
}) {
    const navigate = useNavigate();

    const [carImage, setCarImage] = useState(false);
    const [inFavorite, setInFavorite] = useState(false);

    async function checkFavorite() {
        const email = window.localStorage.getItem('email');
        const response = await fetch('http://localhost:3000/checkcarinfavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, car_id: String(car_id)})
        });

        const data = await response.json();
        if (data.carInFavorite) {
            setInFavorite(true);
        }
    }

    async function getCarImage() {
        const response = await fetch('http://localhost:3000/getcarimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({car_id: String(car_id)})
        })
        const data = await response.json();

        if (data.carIdError) {
            alert('Не удалось получить/прочеть ID автомобиля');
        } else if (data.imageError) {
            alert('Ошибка получения/вывода фотографии автомобиля');
        }

        if (data.successGetCarImage) {
            setCarImage(data.selectedImage);
        }
    }

    useEffect(() => {
        checkFavorite();
        getCarImage();
    },[car_id]);
    

    async function AddToFavorite() {
        const email = window.localStorage.getItem('email');
        console.log(typeof(email));

        const response = await fetch('http://localhost:3000/addcartofavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, car_id: String(car_id)})
        })

        const data = await response.json();
        console.log(data);

        if (data.favoriteCarErrorMessage) {
            alert('Данный автомобиль уже присутствует в вашем списке избранного');
        }

        if (data.successFavoriteMessage) {
            setInFavorite(true);
        }
    }
    async function DeleteFromFavorite() {
        const email = window.localStorage.getItem('email');
        console.log(typeof(email));

        const response = await fetch('http://localhost:3000/deletecarfromfavorite', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, car_id: String(car_id)})
        })

        const data = await response.json();
        console.log(data);

        if (data.successDeleteFromFavoriteMessage) {
            setInFavorite(false);
        }
    }


    return(
         <>
             <div className="car-card">
                 <div className="car-info">
                     <img className='car-image' src={carImage} alt='Нет фото'/>
                     <div className="brand">{brand}</div>
                     <div className="model-name">{model_name} - {model_number}</div>
                     <div className="vehicle">Привод: {car_vehicle}</div>
                     <div className="gearbox">Тип КПП: {gearbox}</div>
                     <div className="body-type">Тип кузова: {body_type}</div>
                     <div className="release-date">Старт производства: {release_date}</div>
                     <div className="end-release-date">Окончание производства: {end_release_date}</div>
                     <div className="price">{price_start} - {price_end}</div>
                 </div>
                 <div className="buttons-container">
                    {
                        inFavorite === false ? (
                            <>
                                <button className='add-to-favorite' onClick={() => { AddToFavorite() }}>Добавить в избранное</button>
                                <button className='open-full-info'
                                    onClick={() => navigate('car-full-info', {
                                        replace: false,
                                        state: { car_id }
                                    })}
                                >
                                    Страница автомобиля
                                </button>
                            </>
                        ) : (
                            <>
                                <p>В избранном ❤️</p>
                                <button className='delete-from-favorite' onClick={() => { DeleteFromFavorite() }}>Удалить из избранного</button>
                                <button className='open-full-info'
                                    onClick={() => navigate('car-full-info', {
                                        replace: false,
                                        state: { car_id }
                                    })}
                                >
                                    Страница автомобиля
                                </button>
                            </>
                        )
                    }
                 </div>
             </div>
             <Outlet />
         </>
    )
}