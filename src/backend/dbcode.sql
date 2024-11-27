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
create table person_table ( -- car table
	person_id int primary key, 	-- car_id
	name varchar(64),
	surname varchar(64),
	age int not null
);

insert into person_table (person_id, name, surname, age) values (1, 'Mikhail', 'Semenov', 21);
insert into person_table (person_id, name, surname, age) values (2, 'Dmitry', 'Semenov', 19);
insert into person_table (person_id, name, surname, age) values (3, 'Artem', 'Demikhov', 23);
insert into person_table (person_id, name, surname, age) values (4, 'Dan', 'Kruk', 54);



create table phone_table ( -- images_table
	phone_id int primary key, -- image_id
	person_id int not null, -- car_id
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
	user_id serial primary key, -- 1 -- связь 1 к 1 roles_table (user_id)
	name varchar(64) not null, -- Touge
	surname varchar(64) not null, -- Driver
	password varchar(128) unique not null,
	email varchar(64) not null, -- mikhailsemenov47@yandex.ru
	phone_number varchar(64) null -- 81234567890
);


create table roles_table (
	role_id serial primary key, -- 1
	role_name varchar(64) not null default 'user', -- administrator
	user_id int unique, -- 1
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade -- связь 1 к 1 users_table (user_id)
);

-- test --
	insert into users_table (name, surname, password, email, phone_number) values ('Main', 'User', '1234', 'mainuser@gmail.com', 89999999999);
	insert into users_table (name, surname, password, email, phone_number) values ('After', 'User', '12345','afteruser@gmail.com', 88888888888);
	
	insert into roles_table ( user_id) values (1);
	insert into roles_table ( user_id) values (2);
	
	delete from users_table where user_id = 1;
	
-- 	update users_table set user_id = 3 where user_id = 2; -- ломающий

	insert into users_table (name, surname, password, email, phone_number) values ('secondAfter', 'administrator', '123456', 'afteruser@gmail.com', 88888888888);
	insert into roles_table (role_name, user_id) values ('admitistrator', 3);
	
	delete from users_table where user_id = 3;
	
	insert into users_table (name, surname, password, email, phone_number) values ('secondAfter', 'administrator', '1234567','afteruser@gmail.com', 88888888888);
	insert into roles_table (user_id) values (4);
	
	update users_table set email = 'togedribfrer@yandex.ru' where user_id = 2;
	
	insert into users_table (name, surname, password, email, phone_number) values ('bade', 'user', '12345678', 'bade@gmail.com', 88888888888);
	insert into roles_table (role_name, user_id) values ('administrator', 5);
	
	select * from users_table;
	select * from roles_table;
-- test --


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
	price varchar(128) not null -- 900.000тысруб
);


create table problems_table (
	problem_id serial primary key, -- связь car_problems_table problem_id
	problem_name varchar(128) not null, -- ржавые_арки
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

-- test --
insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Honda', 'Integra', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into problems_table (problem_name, difficult, how_to_fixed, price)
values ('ржавые_арки', 1, 'автосервис', '100.000тыс.руб');
insert into car_problems_table (car_id, problem_id) values (1, 1);

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Subaru', 'Impreza', 5, 'gc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into problems_table (problem_name, difficult, how_to_fixed, price)
values ('гнилые_пороги', 1, 'автосервис', '150.000тыс.руб');
insert into car_problems_table (car_id, problem_id) values (2, 2);
insert into car_problems_table (car_id, problem_id) values (1, 2);

delete from cars_table where car_id = 1;

update cars_table set model_name = 'Forester' where car_id = 2;

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Honda', 'Integra', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into car_problems_table (car_id, problem_id) values (3, 2);

update car_problems_table set problem_id = 1 where car_id = 3;

delete from cars_table where car_id = 3;

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Subaru', 'Impreza', 5, 'gc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');

select * from cars_table
select * from problems_table
select * from car_problems_table

-- test --


-- Связующая таблица для users_table и cars_table
create table user_cars_table (
	user_id int,
	car_id int,
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade, -- связь user_table user_id
	foreign key (car_id) references cars_table (car_id) on delete cascade on update cascade, -- связь cars_table car_id
	primary key (user_id, car_id)
);


-- test --
insert into users_table (name, surname, password, email, phone_number) values ('Main', 'User', '1234', 'mainuser@gmail.com', 89999999999);
insert into users_table (name, surname, password, email, phone_number) values ('After', 'User', '12345','afteruser@gmail.com', 88888888888);

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Honda', 'Integra', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Subaru', 'Impreza', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');

insert into user_cars_table (user_id, car_id) values (1, 1);
insert into user_cars_table (user_id, car_id) values (1, 2);
insert into user_cars_table (user_id, car_id) values (2, 2);

delete from cars_table where car_id = 1;

update cars_table set model_name = 'Forester' where car_id = 2;

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Mazda', 'rx', 7, 'FD', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');

update user_cars_table set car_id = 3 where user_id = 2;

delete from users_table where user_id = 1;
delete from cars_table where car_id = 3;

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Mazda', 'rx', 7, 'FC', '2001-01-18', '2005-01-18', 1, '1.900.000.тыс.руб');
insert into user_cars_table (user_id, car_id) values (2, 4);

select * from users_table;
select * from cars_table;
select * from user_cars_table;
-- test --


create table car_short_description_table (
	description text not null,
	car_id int unique,
	foreign key (car_id) references cars_table (car_id) on delete cascade on update cascade -- связь cars_table car_id
);


-- test --
insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Honda', 'Integra', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Subaru', 'Impreza', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Mazda', 'rx', 7, 'FD', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');

insert into car_short_description_table (description, car_id) values ('история_создания_машины honda', 1);
insert into car_short_description_table (description, car_id) values ('история_создания_машины subaru', 2);
insert into car_short_description_table (description, car_id) values ('история_создания_машины mazda', 3);

delete from cars_table where car_id = 3;

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Honda', 'Civic', 5, 'VT', '2001-01-18', '2005-01-18', 1, '800.000.тыс.руб');
insert into car_short_description_table (description, car_id) values ('история_создания_машины honda', 4);

update car_short_description_table set description = 'появилась_в_1995_году' where car_id = 4;


select * from cars_table;
select * from car_short_description_table;
-- test --


create table engine_table (
	engine_id serial primary key, -- 1
	engine_serial_name varchar(64) not null, -- 4g18
	engine_size float4 not null, -- 1.6
	engine_type varchar(64) not null, -- rotor, v, h
	engine_nano varchar(64) not null, -- 196Hm
	engine_horse_power varchar(64) not null, -- 98Hp
	engine_expenditure_city varchar(64) not null, -- 8.0
	engine_expenditure_track varchar(64) not null, -- 5.6
	camshaft_system varchar(64) not null -- dohc, sohc, vtek
);
alter table cars_table add foreign key (engine_id) references engine_table (engine_id) on delete cascade on update cascade;


-- test --
insert into engine_table (engine_id, engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, 
engine_expenditure_city, engine_expenditure_track, camshaft_system)
values (1, '4g18', 1.6, 'h', '196Hm', '98Hp', '8.0', '5.6', 'dohc');
insert into engine_table (engine_id, engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, 
engine_expenditure_city, engine_expenditure_track, camshaft_system)
values (2, '4g18', 1.6, 'v', '196Hm', '98Hp', '8.0', '5.6', 'dohc');
insert into engine_table (engine_id, engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, 
engine_expenditure_city, engine_expenditure_track, camshaft_system)
values (3, '4g18', 1.6, 'rotor', '196Hm', '98Hp', '8.0', '5.6', 'sohc');

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Honda', 'Integra', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Subaru', 'Impreza', 5, 'dc5', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');
insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Mazda', 'rx', 7, 'FD', '2001-01-18', '2005-01-18', 1, '900.000.тыс.руб');

delete from engine_table where engine_id = 1;

insert into cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price)
values ('JDM', 'Mazda', 'rx', 7, 'FC', '2001-01-18', '2005-01-18', 2, '900.000.тыс.руб');

update cars_table set engine_id = 3 where model_name = 'rx';
update engine_table set engine_size = 2.0 where engine_id = 3;

delete from cars_table where engine_id = 3;

select * from cars_table;
select * from engine_table;
-- test --
-- для корректной работы последних тестов, нужно скачала создать таблицу cars_table, затем engine table и потом вызвать конструкцию --
-- alter table, insert данных производить сначала в таблицу engine_table затем в cars_table вводя соответствующий engine_id (проверять)


-- final tests --
-- Добавление данных в таблицы
-- Заполнение таблицы engine_table
INSERT INTO engine_table (engine_serial_name, engine_size, engine_type, engine_nano, engine_horse_power, engine_expenditure_city, engine_expenditure_track, camshaft_system) VALUES
    ('4g63', 2.0, 'inline', '4TfH', '300Hp', '10.0', '7.0', 'dohc'),
    ('ej25', 2.5, 'boxer', '12kL', '280Hp', '11.0', '8.0', 'dohc'),
    ('5.0 V8', 5.0, 'v', 'L2jM', '430Hp', '15.0', '10.0', 'dohc'),
    ('3.0 Turbo', 3.0, 'v', '19dW', '350Hp', '12.0', '8.0', 'dohc'),
    ('3.6 V6', 3.6, 'v', 'H12x', '285Hp', '13.0', '9.0', 'dohc');
	
INSERT INTO users_table (name, surname, password, email, phone_number) VALUES
    ('Иван', 'Иванов', 'pass123', 'ivanov@example.com', '1234567890'),
    ('Мария', 'Петрова', 'password456', 'mpetrova@example.com', '9876543210'),
    ('Алексей', 'Сидоров', 'qwerty', 'asidorov@example.com', '5556667777'),
    ('Елена', 'Козлова', 'password1', 'ekozlova@example.com', '3332221111'),
    ('Павел', 'Никитин', 'nikitin123', 'pnikitin@example.com', '9998887777');

-- Заполнение таблицы roles_table
INSERT INTO roles_table (role_name, user_id) VALUES
    ('admin', 1),
    ('user', 2),
    ('user', 3),
    ('user', 4),
    ('user', 5);

-- Заполнение таблицы cars_table
INSERT INTO cars_table (concern, brand, model_name, generation, model_number, release_date, end_release_date, engine_id, price) VALUES
    ('JDM', 'Honda', 'Civic', 10, 'fk2', '2017-02-20', '2021-02-20', 1, '1200.000тысруб'),
    ('JDM', 'Subaru', 'Impreza', 5, 'gc8', '2000-06-15', '2003-06-15', 2, '950.000тысруб'),
    ('Muscle Car', 'Ford', 'Mustang', 6, 'gt500', '2010-03-25', '2013-03-25', 3, '1500.000тысруб'),
    ('Luxury', 'Mercedes-Benz', 'E-Class', 8, 'w213', '2016-09-10', '2021-09-10', 4, '2500.000тысруб'),
    ('SUV', 'Jeep', 'Wrangler', 4, 'jk', '2012-11-08', '2017-11-08', 5, '1800.000тысруб');

-- Заполнение таблицы problems_table
INSERT INTO problems_table (problem_name, difficult, how_to_fixed, price) VALUES
    ('Потеря мощности', 2, 'Заменить фильтр топлива', '200.000тысруб'),
    ('Проблемы с тормозами', 3, 'Заменить тормозные колодки', '300.000тысруб'),
    ('Неисправность стартера', 4, 'Заменить стартер', '400.000тысруб'),
    ('Протечка масла', 2, 'Заменить сальник картера', '250.000тысруб'),
    ('Неисправность свечей зажигания', 3, 'Заменить свечи зажигания', '150.000тысруб');

-- Заполнение таблицы car_problems_table
INSERT INTO car_problems_table (car_id, problem_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- Заполнение таблицы user_cars_table
INSERT INTO user_cars_table (user_id, car_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- Заполнение таблицы car_short_description_table
INSERT INTO car_short_description_table (description, car_id) VALUES
    ('Экономичный автомобиль с хорошей управляемостью', 1),
    ('Спортивный седан с мощным мотором', 2),
    ('Иконический американский маслкар', 3),
    ('Бизнес-седан с роскошным интерьером', 4),
    ('Легендарный внедорожник с высоким клиренсом', 5);


-- Запросы к таблицам
-- Получение всех пользователей и их автомобилей
SELECT u.name, u.surname, c.brand, c.model_name
FROM users_table u
JOIN user_cars_table uc ON u.user_id = uc.user_id
JOIN cars_table c ON uc.car_id = c.car_id;

-- Получение всех проблем с автомобилями и способов их решения
SELECT c.brand, c.model_name, p.problem_name, p.how_to_fixed
FROM cars_table c
JOIN car_problems_table cp ON c.car_id = cp.car_id
JOIN problems_table p ON cp.problem_id = p.problem_id;

-- Получение списка всех автомобилей и связанных с ними проблем
SELECT c.brand, c.model_name, string_agg(p.problem_name, ', ') AS problems
FROM cars_table c
LEFT JOIN car_problems_table cp ON c.car_id = cp.car_id
LEFT JOIN problems_table p ON cp.problem_id = p.problem_id
GROUP BY c.brand, c.model_name;

-- Добавление нового пользователя и связанного с ним автомобиля
INSERT INTO users_table (name, surname, password, email, phone_number)
VALUES ('Новое имя', 'Новая фамилия', 'новый_пароль', 'новый_email@domain.com', '1234567890');

INSERT INTO user_cars_table (user_id, car_id)
VALUES (6, 3);


-- Обновление описания автомобиля
UPDATE car_short_description_table
SET description = 'Развалюха'
WHERE car_id = 3;

-- Удаление проблемы и всех связей с автомобилями
DELETE FROM problems_table
WHERE problem_id = 2;

DELETE FROM car_problems_table
WHERE problem_id = 3;

-- Получение информации о двигателе для конкретной модели автомобиля
SELECT c.brand, c.model_name, e.engine_serial_name, e.engine_size
FROM cars_table c
JOIN engine_table e ON c.engine_id = e.engine_id
WHERE c.model_name = 'Impreza';

-- Получение списка пользователей с их ролями
SELECT u.name, u.surname, r.role_name
FROM users_table u
LEFT JOIN roles_table r ON u.user_id = r.user_id;


truncate users_table, roles_table, cars_table, problems_table, car_problems_table, car_short_description_table, engine_table, user_cars_table cascade;
select * from roles_table;
select * from users_table;
select * from car_short_description_table;
-- final tests --

