create table users_table (
	user_id serial primary key, -- 1 -- связь 1 к 1 roles_table (user_id)
	name varchar(64) not null, -- Touge
	surname varchar(64) not null, -- Driver
	password varchar(128) not null,
	email varchar(64) unique not null, -- mikhailsemenov47@yandex.ru
	phone_number varchar(64) null -- 81234567890
);


create table roles_table (
	role_id serial primary key, -- 1
	role_name varchar(64) not null default 'user', -- administrator
	user_id int unique, -- 1
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade -- связь 1 к 1 users_table (user_id)
);

create table cars_table (
	car_id serial primary key, -- 1 -- связь car_problems_table car_id -- связь car_short_description_table car_id -- связь user_cars_table car_id
	concern varchar(64) not null, -- JDM
	brand varchar(64) not null, -- Honda
	model_name varchar(64) not null, -- Integra
	generation int not null, -- 5
	model_number varchar(64) not null, -- dc5
	release_date date not null, -- 2002-01-18
	end_release_date date not null, -- 2005-01-18
	engine_id int not null, -- 1 -- связь engine_table (engine_id)
	gearbox varchar(64) not null, -- manual, automatic, variator
	car_vehicle varchar(64) not null, -- awd, fwd, rwd
	body_type varchar(64) not null, -- hatchback, sedan, universal and other
	price_start int not null, -- 900.000тысруб
	price_end int not null -- 1.900.000тысруб
);


create table problems_table (
	problem_id serial primary key, -- связь car_problems_table problem_id
	problem_name varchar(128) unique not null, -- ржавые_арки
	problem_short_description text null,
	difficult int not null, -- 1
	how_to_fixed text not null, -- автосервис
	problem_price varchar(128) not null -- 100.000тысруб
);


-- Связующая таблица для cars_table и probems_table
create table car_problems_table (
	car_id int,
	problem_id int,
	foreign key (car_id) references cars_table (car_id) on delete cascade on update cascade, -- связь cars_table car_id
	foreign key (problem_id) references problems_table (problem_id) on delete cascade on update cascade, -- связь problems_table problem_id
	primary key (car_id, problem_id)
);

create table user_cars_table (
	user_id int,
	car_id int,
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade, -- связь user_table user_id
	foreign key (car_id) references cars_table (car_id) on delete cascade on update cascade, -- связь cars_table car_id
	primary key (user_id, car_id)
);

create table car_short_description_table (
	description text not null,
	car_id int unique,
	foreign key (car_id) references cars_table (car_id) on delete cascade on update cascade -- связь cars_table car_id
);

create table engine_table (
	engine_id serial primary key, -- 1
	engine_serial_name varchar(64) unique not null, -- 4g18
	engine_size float4 not null, -- 1.6
	engine_type varchar(64) not null, -- rotary, inline, opposite, v-model 
	engine_nano varchar(64) not null, -- 196Hm
	engine_horse_power varchar(64) not null, -- 98Hp
	engine_expenditure_city varchar(64) not null, -- 8.0
	engine_expenditure_track varchar(64) not null, -- 5.6
	camshaft_system varchar(64) not null -- dohc, sohc, vtek
);
alter table cars_table add foreign key (engine_id) references engine_table (engine_id) on delete cascade on update cascade;

-- создание таблицы с картинками и её тестирование
create table images_table (
	image_id serial primary key,
	car_id int not null,
	src bytea null, -- blob тип данных
	for_car_name varchar(64) not null, -- subaru
	foreign key (car_id) references cars_table (car_id) on delete cascade on update cascade
);

INSERT INTO engine_table (engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system)
VALUES ('4g18', 1.6, 'inline', '196Hm', '98Hp', '8.0', '5.6', 'sohc'),
       ('RB26DETT', 2.6, 'inline', '250Hm', '280Hp', '12.5', '9.2', 'dohc'),
       ('EJ25', 2.5, 'opposite', '240Hm', '224Hp', '10.2', '7.8', 'sohc');

INSERT INTO cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, gearbox, car_vehicle, body_type, price_start, price_end)
VALUES ('JDM', 'Honda', 'Integra', 5, 'dc5', '2002-01-18', '2005-01-18', 1, 'Механическая (MT)', 'FWD', 'Купе', 900000, 2000000),
	   ('JDM', 'Honda', 'Fit', 4, 'GK', '2013-01-01', '2020-12-31', 1, 'Механическая (MT)', 'FWD', 'Хэтчбек', 700000, 1200000),
       ('JDM', 'Honda', 'S2000', 2, 'AP1', '1999-01-01', '2009-05-01', 1, 'Механическая (MT)', 'RWD', 'Кабриолет', 1800000, 2800000),
       ('JDM', 'Honda', 'Civic', 10, 'FC', '2016-01-01', '2021-12-31', 1, 'Автоматическая (AT)', 'FWD', 'Седан', 950000, 1800000),
       ('JDM', 'Honda', 'CR-V', 5, 'RM1', '2016-01-01', '2022-12-31', 2, 'Автоматическая (AT)', 'AWD', 'Внедорожник', 1600000, 2400000),
       ('JDM', 'Honda', 'Element', 1, 'K20', '2003-01-01', '2011-12-31', 3, 'Автоматическая (AT)', 'AWD', 'Кроссовер', 1000000, 1500000),
       ('JDM', 'Honda', 'HR-V', 2, 'RU1', '2015-01-01', '2021-12-31', 2, 'Автоматическая (AT)', 'FWD', 'Кроссовер', 1400000, 2000000),
       ('JDM', 'Honda', 'Jazz', 3, 'GK2', '2014-01-01', '2020-12-31', 1, 'Автоматическая (AT)', 'FWD', 'Хэтчбек', 800000, 1400000),
       ('JDM', 'Honda', 'Pilot', 2, 'YF2', '2016-01-01', '2022-12-31', 3, 'Автоматическая (AT)', 'AWD', 'Внедорожник', 2400000, 3500000),
       ('JDM', 'Honda', 'Ridgeline', 2, 'RL2', '2016-01-01', '2021-12-31', 3, 'Автоматическая (AT)', 'AWD', 'Пикап', 2200000, 3000000),
       ('JDM', 'Honda', 'Accord', 7, '12V55W', '2017-01-18', '2020-01-18', 1, 'Автоматическая (AT)', 'AWD', 'Седан', 1900000, 2600000),
       ('JDM', 'Honda', 'Legend', 6, 'KC2', '2015-01-01', '2020-12-31', 2, 'Автоматическая (AT)', 'AWD', 'Седан', 2500000, 3500000),
	   ('JDM', 'Subaru', 'Impreza', 2, 'GC7', '1998-01-18', '2003-01-18', 1, 'Механическая (MT)', 'FWD', 'Купе', 700000, 2500000),
	   ('JDM', 'Subaru', 'Forester', 4, 'SJ', '2012-01-01', '2020-12-31', 2, 'Механическая (MT)', 'AWD', 'Внедорожник', 1200000, 2200000),
       ('JDM', 'Subaru', 'BRZ', 1, 'ZC6', '2012-01-01', '2020-12-31', 1, 'Механическая (MT)', 'RWD', 'Купе', 1700000, 3000000),
	   ('JDM', 'Subaru', 'WRX', 5, 'VA', '2014-01-01', '2021-12-31', 1, 'Механическая (MT)', 'AWD', 'Седан', 1800000, 3200000),
       ('JDM', 'Subaru', 'WRX STI', 6, 'VAB', '2015-01-01', '2021-12-31', 2, 'Механическая (MT)', 'AWD', 'Седан', 2200000, 3700000),
	   ('JDM', 'Subaru', 'Justy', 3, 'K-1', '1985-01-01', '1994-01-01', 1, 'Механическая (MT)', 'FWD', 'Хэтчбек', 600000, 1000000),
       ('JDM', 'Toyota', 'Supra', 4, 'A80', '1993-05-11', '2002-08-17', 2, 'Механическая (MT)', 'RWD', 'Купе', 1500000, 2000000),
       ('JDM', 'Subaru', 'Crosstrek', 1, 'GV', '2012-01-01', '2021-12-31', 3, 'Автоматическая (AT)', 'AWD', 'Кроссовер', 1400000, 2300000),
       ('JDM', 'Subaru', 'Legacy', 6, 'BR9', '2010-01-01', '2020-12-31', 1, 'Автоматическая (AT)', 'AWD', 'Седан', 1500000, 2500000),
       ('JDM', 'Subaru', 'Outback', 5, 'BN', '2015-01-01', '2021-12-31', 2, 'Автоматическая (AT)', 'AWD', 'Универсал', 1600000, 2800000),
       ('JDM', 'Subaru', 'Ascent', 1, 'NS', '2019-01-01', '2022-12-31', 3, 'Автоматическая (AT)', 'AWD', 'Внедорожник', 2200000, 3500000),
       ('JDM', 'Subaru', 'Legacy', 3, 'BC5', '1992-01-01', '1996-12-31', 1, 'Автоматическая (AT)', 'AWD', 'Седан', 900000, 1400000),
       ('JDM', 'Subaru', 'B9 Tribeca', 2, 'B9', '2006-01-01', '2014-06-30', 2, 'Автоматическая (AT)', 'AWD', 'Внедорожник', 1300000, 2000000),
       ('Euro', 'Volkswagen', 'Golf', 7, 'Mk7', '2012-11-14', '2019-12-30', 3, 'Автоматическая (AT)', 'FWD', 'Хэтчбек', 1200000, 2000000);

INSERT INTO images_table (car_id, src, for_car_name)
VALUES (1, '123456789', 'honda'),
       (2, '', 'toyota'),
	   (3, '', 'vw');

delete from images_table where car_id = 2;
delete from images_table where car_id = 1;
select * from cars_table ut right join images_table it on ut.car_id = it.car_id;
