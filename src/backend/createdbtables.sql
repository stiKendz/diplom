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
	price varchar(128) not null -- 900.000тысруб
);


create table problems_table (
	problem_id serial primary key, -- связь car_problems_table problem_id
	problem_name varchar(128) not null, -- ржавые_арки
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
	engine_serial_name varchar(64) not null, -- 4g18
	engine_size float4 not null, -- 1.6
	engine_type varchar(64) not null, -- rotary, inline, opposite, v-model 
	engine_nano varchar(64) not null, -- 196Hm
	engine_horse_power varchar(64) not null, -- 98Hp
	engine_expenditure_city varchar(64) not null, -- 8.0
	engine_expenditure_track varchar(64) not null, -- 5.6
	camshaft_system varchar(64) not null -- dohc, sohc, vtek
);
alter table cars_table add foreign key (engine_id) references engine_table (engine_id) on delete cascade on update cascade;

create table images_table (
	image_id serial primary key,
	src varchar(256) null,
	position int null,
	for_car varchar(64) null
);
alter table cars_table add foreign key (image_id) references images_table (image_id) on delete cascade on update cascade;