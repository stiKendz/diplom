import React from "react";
import { createContext } from "react";

export const AdditionContext = createContext();

export const filtersDescription = [                                    
     {
        name: "concern",           
        bigAddition: `
            Этот фильтр позволяет выбрать автомобиль из 
            конкретной группы компаний-производителей.
        `,
        smallAddition: `
            VAG (Volkswagen Group) — немецкий концерн, включающий марки: Volkswagen, Audi, Skoda, Seat, Porsche и другие.
            Toyota Motors — японский производитель, включающий марки: Toyota, Lexus, Daihatsu
            PSA (Stellantis) — европейский концерн, включающий марки: Peugeot, Citroën, Opel, DS
        `                                    
    },                                    
    {
        name: "company",                  
        bigAddition: `
            Этот фильтр позволяет выбрать марку производитяля автомобиля.
        `,
        smallAddition: `
            Российские марки
            ГАЗ - Производитель грузовиков и коммерческих автомобилей, известен моделями "Волга" и "Газель".

            ВАЗ (АвтоВАЗ) - Выпускает легковые автомобили, включая легендарные "Жигули" и современные Lada.

            ЗИЛ - Производил грузовики и правительственные лимузины (ныне не существует).

            Лада - Основной бренд АвтоВАЗа, популярен благодаря доступным седанам и внедорожникам.

            КамАЗ - Лидер в производстве тяжелых грузовиков и спецтехники.

            ИЖ - Выпускал малолитражки (например, "ИЖ-2125 Комби").

            Ока - Микролитражный городской автомобиль (ВАЗ-1111).

            Москвич - Советские и российские легковые авто (сейчас возрождается).

            УАЗ - Производитель внедорожников ("Буханка", "Патриот").


            Французские марки
            Peugeot - Известен стильными хэтчбеками и кроссоверами (208, 3008).

            Citroën - Инновационные авто с мягкой подвеской (C4, C5 Aircross).

            Renault - Популярные бюджетные и семейные модели (Logan, Duster).

            Alpine - Спортивные авто (A110).

            Bugatti - Роскошные гиперкары (Chiron, Veyron).


            Японские марки
            Acura - Премиум-бренд Honda (кроссоверы, седаны).

            Datsun - Бюджетные авто (родственник Nissan).

            Honda - Надежные седаны (Civic) и внедорожники (CR-V).

            Infiniti - Люксовый бренд Nissan (Q50, QX60).

            Lexus - Премиум-подразделение Toyota (NX, RX).

            Mazda - Авто с технологией SkyActiv (CX-5, MX-5).

            Mitsubishi - Внедорожники (Pajero, Outlander).

            Nissan - Массовые модели (Qashqai, X-Trail).

            Subaru - Полноприводные авто (Forester, Impreza).

            Suzuki - Компактные авто (Swift, Jimny).

            Toyota - Лидер надежности (Corolla, RAV4).
        
            Американские марки
            Buick - Комфортные седаны и кроссоверы (General Motors).

            Cadillac - Премиум-авто (Escalade, CT5).

            Chevrolet - Разнообразный модельный ряд (Camaro, Tahoe).

            Chrysler - Минивэны (Pacifica) и седаны.

            Dodge - Мощные авто (Charger, Challenger).

            Ford - Массовые модели (Focus, Mustang).

            Hummer - Легендарные внедорожники (H2, электрический Hummer EV).

            Jeep - Внедорожники (Wrangler, Grand Cherokee).

            Lincoln - Люксовый бренд Ford (Navigator).

            Pontiac - Спортивные авто (ныне не существует).

            Tesla - Лидер электромобилей (Model 3, Cybertruck).

            Корейские марки
            Daewoo - Недорогие авто (ныне часть GM).

            Genesis - Премиум-бренд Hyundai (G80, GV80).

            Hyundai - Популярные модели (Solaris, Tucson).

            Kia - Стильные авто (Rio, Sportage).

            SsangYong - Внедорожники (Rexton).

            Шведские марки
            Saab - Авиационные технологии в авто (ныне не существует).

            Scania - Грузовики и автобусы.

            Volvo - Безопасные авто (XC90, S60).

            Чешские марки
            Škoda - Практичные авто (Octavia, Kodiaq).

            Китайские марки
            Changan - Доступные седаны и кроссоверы.

            Chery - Бюджетные модели (Tiggo).

            Exeed - Премиум-подразделение Chery.

            Geely - Владелец Volvo (Coolray, Atlas).

            Haval - Внедорожники (H6, Jolion).

            JAC - Электромобили и коммерческий транспорт.

            Jaecoo - Суббренд Chery (новые кроссоверы).

            Jetour - Молодежные модели (X70).

            Lixiang - Производитель гибридных авто (Li ONE).

            Omoda - Современные кроссоверы (Omoda 5).

            Zeekr - Премиум-электромобили (Geely).

            Английские марки
            Bentley - Роскошные авто (Continental GT).

            Jaguar - Элегантные седаны (XF, F-Pace).

            Land Rover - Внедорожники (Range Rover, Defender).

            Rover - Классические британские авто.

            Немецкие марки
            Audi - Премиум-авто с Quattro (A6, Q7).

            BMW - "Автомобили для водителя" (3 Series, X5).

            MAN - Грузовики и автобусы.

            Maybach - Ультра-люкс (Mercedes-Benz).

            Mercedes-Benz - Эталон комфорта (E-Class, GLE).

            Opel - Немецкие авто (Astra, Insignia).

            Porsche - Спортивные авто (911, Cayenne).

            Volkswagen - Народные авто (Golf, Tiguan).

            Итальянские марки
            Ferrari - Легендарные спорткары (SF90, Roma).

            Fiat - Компактные авто (500, Panda).

            Iveco - Грузовики и коммерческий транспорт.

            Lamborghini - Экстремальные суперкары (Aventador, Urus).
        `                                    
    },
    {
        name: "gearbox",                  
        bigAddition: `
            Этот фильтр позволяет выбрать тип коробки передач, который влияет на комфорт вождения, расход топлива и динамику автомобиля.
        `,
        smallAddition: `
            Механическая (MT) — полный контроль над трансмиссией, экономичность и долговечность. 
            Лучший выбор для любителей активного вождения и эксплуатации в тяжелых условиях. 
            Примеры: Lada Granta (бюджетный сегмент), Subaru WRX STI (спортивные модели).

            Классический автомат (AT) — максимальный комфорт благодаря плавным переключениям. 
            Потребляет немного больше топлива, но идеален для городских пробок и длительных поездок.
            Примеры: Toyota Camry (бизнес-класс), Mercedes E-Class (премиум сегмент).

            Роботизированная (AMT/DSG) — сочетает скорость переключений механики с удобством автомата. 
            Преселективные коробки (DSG) требуют качественного обслуживания, но дают спортивный характер езды.
            Примеры: Volkswagen Golf (DSG), Renault Logan (бюджетный AMT Easy-R).

            Вариатор (CVT) — обеспечивает идеально плавный разгон без рывков переключений. 
            Требует бережного отношения и своевременной замены дорогостоящей трансмиссионной жидкости.
            Примеры: Honda Civic (компакт-класс), Nissan Qashqai (кроссоверы).

            Гибридные трансмиссии — интеллектуальное сочетание ДВС и электромотора. 
            Обеспечивают минимальный расход топлива, но сложны и дороги в ремонте.
            Примеры: Toyota Prius (полноценные гибриды), Lexus RX 450h (премиум гибриды).
        `                                    
    },
    {
        name: "bodyType",                            
        bigAddition: `
            Этот фильтр позволяет выбрать тип кузова будущего автомобиля, который влитяет на вес, управляемость, место в салоне и багажнке, габариты автомобиоля.
        `,
        smallAddition: `
            Седан - классический трехобъемный кузов с отдельными капотом, салоном и багажником. Имеет 4 двери, жесткую крышу и строгий дизайн. Подходит для повседневной езды и бизнес-класса.
            Хэтчбек - двухобъемный кузов с укороченным задним свесом и пятой дверью, объединяющей багажник и салон. Бывает 3- или 5-дверным. Компактный и удобный для города.
            Универсал - похож на хэтчбек, но с удлиненной крышей и увеличенным багажным отсеком.
            Купе - спортивный двухдверный кузов с покатой крышей и низкой посадкой.
        `                                   
    },   
    {
        name: "vehicle",                  
        bigAddition: `
            Этот фильтр позволяет выбрать привод автомобиля, который влияет на управлемость автомобиля.
        `,
        smallAddition: `
            Передний привод (FWD) — распространенный вариант для городских авто. 
            Примеры: Volkswagen Golf, Hyundai Solaris. Экономичен, прост в управлении на асфальте.
        
            Задний привод (RWD) — классическая схема для спортивных и премиальных машин. 
            Примеры: BMW 3 Series, Mercedes C-Class. Хорошая развесовка, подходит для динамичной езды.
            
            Полный привод (AWD/4WD) — для бездорожья или сложных дорожных условий. 
            Примеры: Subaru Outback, Toyota Land Cruiser. Повышенная устойчивость и тяга.
            
            Подключаемый полный привод — автоматически активируется при пробуксовке. 
            Примеры: кроссоверы типа Nissan Qashqai или Renault Duster.
        `                                    
    },
    {
        name: "release",                  
        bigAddition: `
            Этот фильтр позволяет выбрать промежуток времени в который выпукались определенные автомобили.
        `,
        smallAddition: `
            Современные автомобили (2020–2024) — новейшие технологии, актуальный дизайн, высокая цена.  
            Автомобили 2015–2019 годов — хороший баланс цены и характеристик, проверенная надежность.  
            Автомобили 2010–2014 годов — доступные варианты с остатком ресурса, но возможен износ деталей.  
            Автомобили 2000–2009 годов — бюджетный сегмент, простые в ремонте, но требуют внимания к состоянию.  
            Автомобили 1990–1999 годов — ретро-модели для ценителей, часто требуют реставрации или тюнинга.  
            Автомобили 1980–1989 годов — классика автопрома, коллекционные экземпляры, могут быть сложны в обслуживании
        `                                    
    }, 
    {
        name: "price",                  
        bigAddition: `
            Этот фильтр позволяет выбрать интервал цен на автомобили.
        `,
        smallAddition: `
            При выборе интервала стоит учитывать:

            Цена ≠ возраст авто: В премиальном сегменте высокую стоимость могут иметь даже старые модели, если они полностью восстановлены, имеют низкий пробег или редкую комплектацию.
            Примеры таких авто: Mercedes W211 E-Class в идеальном состоянии или Subaru Impreza GD с заводским турбо-двигателем ценятся коллекционерами, поэтому их цена сопоставима с новыми машинами среднего класса.
            Тюнинг как фактор стоимости: Кастомные доработки (двигатель, подвеска, экстерьер) увеличивают цену даже для возрастных моделей — например, тюнингованная Honda Civic 2008 года может стоить дороже нового седана B-класса.
            Рынок нишевых моделей: Некоторые автомобили (например, Mazda RX-8 с роторным двигателем) из-за уникальности и сложности обслуживания сохраняют высокую цену даже спустя 15–20 лет после выпуска.
        `                                    
    },                             
]                          
