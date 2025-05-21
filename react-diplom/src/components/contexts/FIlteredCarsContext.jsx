import React from 'react'
import { createContext } from 'react'
import { useState, useEffect, useContext } from 'react';


const FilteredCarsContext = createContext();

export const FilteresCarsProvider = ({children}) => {
    const [showResults, setShowResults] = useState(false);
    const [filteredCarsArray, setFilteredCars] = useState([]);

    return (
        <FilteredCarsContext.Provider value={{ showResults, setShowResults, filteredCarsArray, setFilteredCars }}>
            {children}
        </FilteredCarsContext.Provider>
    );
};

export const UseFilteredCarsContext = () => {
    return useContext(FilteredCarsContext);
};