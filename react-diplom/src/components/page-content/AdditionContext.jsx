import React from "react";
import { createContext } from "react";

export const AdditionContext = createContext();

export const filtersDescription = [                                    
     {                  
        concernBigAddition: `
            Этот фильтр помогает выбрать автомобиль из 
            конкретной группы компаний-производителей
        `,
        concernSmallAddition: `
            VAG (Volkswagen Group) — немецкий концерн, включающий марки: Volkswagen, Audi, Skoda, Seat, 
            Porsche и другие.
            Toyota Motors — японский производитель, включающий марки: Toyota, Lexus, Daihatsu
            PSA (Stellantis) — европейский концерн, включающий марки: Peugeot, Citroën, Opel, DS
        `                                    
    },                                    
    {                     
        bigAddition: `
            Этот фильтр помогает выбрать марку производитяля автомобиля на основе выбранного о концерна 
        `,
        smallAddition: `
            Passat ...
            Polo ...
            Golf ...
        `                                    
    },                                    
    {                                  
        bigAddition: `
            Этот фильтр помогает выбрать тип кузова будущего автомобиля
        `,
        smallAddition: `
            Седан - 
            Купе -
            Универсал - 
        `                                    
    },                                    
]                          
