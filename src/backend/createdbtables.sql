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
	model_number varchar(64) unique not null, -- dc5
	release_date date not null, -- 2002-01-18
	end_release_date date not null, -- 2005-01-18
	engine_id int not null, -- 1 -- связь engine_table (engine_id)
	gearbox varchar(64) not null, -- manual, automatic, variator
	car_vehicle varchar(64) not null, -- awd, fwd, rwd
	body_type varchar(64) not null, -- hatchback, sedan, universal and other
	price varchar(128) not null -- 900.000тысруб
);


create table problems_table (
	problem_id serial primary key, -- связь car_problems_table problem_id
	problem_name varchar(128) unique not null, -- ржавые_арки
	problem_short_description text null,
	difficult int not null, -- 1
	how_to_fixed text not null, -- автосервис
	price varchar(128) not null -- 100.000тысруб
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

INSERT INTO cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, gearbox, car_vehicle, body_type, price)
VALUES ('JDM', 'Honda', 'Integra', 5, 'dc5', '2002-01-18', '2005-01-18', 1, 'manual', 'fwd', 'hatchback', '900.000тысруб'),
       ('JDM', 'Toyota', 'Supra', 4, 'A80', '1993-05-11', '2002-08-17', 2, 'manual', 'rwd', 'coupe', '1.500.000тысруб'),
       ('Euro', 'Volkswagen', 'Golf', 7, 'Mk7', '2012-11-14', '2019-12-30', 3, 'automatic', 'fwd', 'hatchback', '1.200.000тысруб');

INSERT INTO images_table (car_id, src, for_car_name)
VALUES (1, '123456789', 'honda'),
       (2, '', 'toyota'),
	   (3, '', 'vw');

delete from images_table where car_id = 2;
select * from cars_table ut right join images_table it on ut.car_id = it.car_id;
