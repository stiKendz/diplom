import React from 'react'
import { createContext } from 'react'
import { useState, useEffect, useContext } from 'react';


const FilteredCarsContext = createContext();

export const FilteresCarsProvider = ({children}) => {
    const [showResults, setShowResults] = useState(false);
    const [filteredCarsArray, setFilteredCars] = useState([]);

    const [filtersArray, setFiltersArray] = useState(() => {
        const savedFilters = localStorage.getItem('filtersArray');
        return savedFilters ? JSON.parse(savedFilters) : [];
    });

    useEffect(() => {
        localStorage.setItem('filtersArray', JSON.stringify(filtersArray));
    }, [filtersArray]);

    return (
        <FilteredCarsContext.Provider value={{ showResults, setShowResults, filteredCarsArray, setFilteredCars, filtersArray, setFiltersArray }}>
            {children}
        </FilteredCarsContext.Provider>
    );
};

export const UseFilteredCarsContext = () => {
    return useContext(FilteredCarsContext);
};