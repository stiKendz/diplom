-- тренировочная база данных (вспомнил связи)
-- многие ко многим
create table Employers (
	employeeId int primary key,
	employeeName varchar(128) not null,
	employeeAge int not null
);

insert into Employers (employeeId, employeeName, employeeAge) values (1, 'Demid', 34);
insert into Employers (employeeId, employeeName, employeeAge) values (2, 'Demid', 33);
insert into Employers (employeeId, employeeName, employeeAge) values (3, 'Demid', 21);



create table positionTable (
	positionId int primary key,
	positionName varchar(64) not null
);

insert into positionTable (positionId, positionName) values (1, 'Programmer');
insert into positionTable (positionId, positionName) values (2, 'Director');
insert into positionTable (positionId, positionName) values (3, 'Middle-programmer');


-- связующая таблица
create table employeePositions (
    positionId int,
    employeeId int,
    foreign key (positionId) references positionTable(positionId),
    foreign key (employeeId) references Employers(employeeId),
    primary key (positionId, employeeId)
);

insert into employeePositions (positionId, employeeId) values (1, 1);
insert into employeePositions (positionId, employeeId) values (1, 2);
insert into employeePositions (positionId, employeeId) values (2, 3);
insert into employeePositions (positionId, employeeId) values (3, 3);



-- однин ко многим
create table person_table (
	person_id int primary key,
	name varchar(64),
	surname varchar(64),
	age int not null
);

insert into person_table (person_id, name, surname, age) values (1, 'Mikhail', 'Semenov', 21);
insert into person_table (person_id, name, surname, age) values (2, 'Dmitry', 'Semenov', 19);
insert into person_table (person_id, name, surname, age) values (3, 'Artem', 'Demikhov', 23);
insert into person_table (person_id, name, surname, age) values (4, 'Dan', 'Kruk', 54);



create table phone_table (
	phone_id int primary key,
	person_id int not null,
	phone_number varchar(128) null,
	foreign key (person_id) references person_table(person_id)
);

insert into phone_table (phone_id, person_id, phone_number) values (1, 4, '89164382632');
insert into phone_table (phone_id, person_id, phone_number) values (2, 2, '89434382632');
insert into phone_table (phone_id, person_id, phone_number) values (3, 2, '89324382062');


-- один к одному (связь на Employers - первую таблицу)
create table disabled_person_table (
	disabled_person_id int primary key,
	employee_id int unique,
	foreign key (employee_id) references Employers(employeeId)
);

insert into disabled_person_table (disabled_person_id, employee_id) values (1, 1);
insert into disabled_person_table (disabled_person_id, employee_id) values (2, 3);

-- немного запросов
select * from Employers;
select * from positionTable;
select * from employeePositions;
select * from person_table;

-- join запрос
select * from Employers join disabled_person_table on Employers.employeeId = disabled_person_table.employee_id;



-- Для курсовой работы и диплома

create table users_table (
	user_id int primary key, -- 1 -- связь 1 к 1 roles_table (user_id)
	name varchar(64) not null, -- Touge
	surname varchar(64) not null, -- Driver
	email varchar(64) not null, -- mikhailsemenov47@yandex.ru
	phone_number varchar(64) null -- 81234567890
);


create table roles_table (
	role bit primary key,
	user_id int unique,
	foreign key (user_id) references users_table (user_id) -- связь 1 к 1
);


create table cars_table (
	car_id int primary key, -- 1 -- связь car_problems_table car_id -- связь car_short_description_table car_id -- связь user_cars_table car_id
	concern varchar(64) not null, -- JDM
	brand varchar(64) not null, -- Honda
	model_name varchar(64) not null, -- Integra
	generation varchar(64) not null, -- поколение 5
	model_number varchar(64) not null, -- dc5
	year varchar(64) not null, -- 2002
	complectation varchar(64) not null,
	price varchar(128) not null -- 600.000тысруб
);


create table problems_table (
	problem_id int primary key, -- связь car_problems_table problem_id
	name varchar(128) not null,
	difficult int not null,
	price varchar(128) not null,
	how_to_fixed text not null
);


-- Связующая таблица для cars_table и probems_table
create table car_problems_table (
	car_id int,
	problem_id int,
	foreign key (car_id) references cars_table (car_id), -- связь cars_table car_id
	foreign key (problem_id) references problems_table (problem_id), -- связь problems_table problem_id
	primary key (car_id, problem_id)
);


-- Связующая таблица для user_table и cars_table
create table user_cars_table (
	user_id int,
	car_id int,
	foreign key (user_id) references users_table (user_id), -- связь user_table user_id
	foreign key (car_id) references cars_table (car_id), -- связь cars_table car_id
	primary key (user_id, car_id)
);


create table car_short_description_table (
	desription text not null,
	car_id int unique,
	foreign key (car_id) references cars_table (car_id) -- связь cars_table car_id
)


create table engine_table (

);

create table filters_table (
	
);