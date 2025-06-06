import React from 'react';
import { createContext } from 'react';
import {useState, useContext, useEffect} from 'react';

import CarCard from '../cars/car-card/CarCard';

export default function FavoriteCars() {
    const [favoriteCarsData, setFavoriteCarsData] = useState([]);
    useEffect(() => {
        GetFavoriteCars();
    }, [])

    async function GetFavoriteCars() {
        const email = window.localStorage.getItem('email');

        const response = await fetch('http://localhost:3000/getfavoritecars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        })

        const data = await response.json();

        if (data.favoriteCars) {
            setFavoriteCarsData(data.favoriteCars);
        }
    }

    function correctDate(stringDate) {
        return stringDate.split('T')[0];
    }

    return(
        <>
            <h2>Любимые автомобили</h2>
            <div className='favorite-cards-container'>
                {
                    Array.isArray(favoriteCarsData) && favoriteCarsData.length > 0 ? (
                        favoriteCarsData.map((car, index) => (
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
                        <p>Ваш список избранных автомобилей пуст</p>
                    )   
                }
            </div>
        </>
    )
}