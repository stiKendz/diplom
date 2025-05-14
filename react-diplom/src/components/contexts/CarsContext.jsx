import React from 'react'
import { createContext } from 'react'
import { useState, useEffect } from 'react';


const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            const response = await fetch('http://localhost:3000/getcars', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();

            if (data.allCars) {
                setCars(data.allCars)
            }
        };
        getCars();
    }, []);

    return (
        <CarsContext.Provider value={cars}>
            {children}
        </CarsContext.Provider>
    )
}

export const useCars = () => {
    return React.useContext(CarsContext);
};