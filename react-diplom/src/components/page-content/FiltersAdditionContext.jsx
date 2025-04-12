import React from "react";
import { createContext, useContext, useState } from "react";

export const FiltersAdditionContext = filtersDescription.createContext(filtersDescription);

const filtersDescription = {                                    
    concernFilter: {                                    
        bigAddition: `
            Этот фильтр помогает выбрать автомобиль из 
            конкретной группы компаний-производителей
        `,
        smallAddition: `
            VAG (Volkswagen Group) — немецкий концерн, включающий марки: Volkswagen, Audi, Skoda, Seat, 
            Porsche и другие.
            Toyota Motors — японский производитель, включающий марки: Toyota, Lexus, Daihatsu
            PSA (Stellantis) — европейский концерн, включающий марки: Peugeot, Citroën, Opel, DS
        `                                    
    },                                    
    brandFilter: {                                    
        bigAddition: `
            Этот фильтр помогает выбрать марку производитяля автомобиля на основе выбранного о концерна 
        `,
        smallAddition: `
            Passat ...
            Polo ...
            Golf ...
        `                                    
    },                                    
    bodytypeFilter: {                                    
        bigAddition: `
            Этот фильтр помогает выбрать тип кузова будущего автомобиля
        `,
        smallAddition: `
            Седан - 
            Купе -
            Универсал - 
        `                                    
    },                                    
}                                    
