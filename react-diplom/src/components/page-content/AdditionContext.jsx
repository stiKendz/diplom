import React from "react";
import { createContext } from "react";

export const AdditionContext = createContext();

export const filtersDescription = [                                    
     {
        name: "concern",           
        bigAddition: `
            Этот фильтр помогает выбрать автомобиль из 
            конкретной группы компаний-производителей
        `,
        smallAddition: `
            VAG (Volkswagen Group) — немецкий концерн, включающий марки: Volkswagen, Audi, Skoda, Seat, Porsche и другие.
            Toyota Motors — японский производитель, включающий марки: Toyota, Lexus, Daihatsu
            PSA (Stellantis) — европейский концерн, включающий марки: Peugeot, Citroën, Opel, DS
        `                                    
    },                                    
    {
        name: "car",                  
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
        name: "bodyType",                            
        bigAddition: `
            Этот фильтр помогает выбрать тип кузова будущего автомобиля
        `,
        smallAddition: `
            Седан - классический трехобъемный кузов с отдельными капотом, салоном и багажником. Имеет 4 двери, жесткую крышу и строгий дизайн. Подходит для повседневной езды и бизнес-класса.
            Хэтчбек - двухобъемный кузов с укороченным задним свесом и пятой дверью, объединяющей багажник и салон. Бывает 3- или 5-дверным. Компактный и удобный для города.
            Универсал - похож на хэтчбек, но с удлиненной крышей и увеличенным багажным отсеком.
            Купе - спортивный двухдверный кузов с покатой крышей и низкой посадкой.
            ывы
            выв
            ыв
        `                                   
    },                                    
]                          
