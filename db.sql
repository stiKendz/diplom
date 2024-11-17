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



create table disabled_person_table (
	disabled_person_id int primary key,
	employee_id int unique,
	foreign key (employee_id) references Employers(employeeId)
);

insert into disabled_person_table (disabled_person_id, employee_id) values (1, 1);
insert into disabled_person_table (disabled_person_id, employee_id) values (2, 3);


select * from Employers;
select * from positionTable;
select * from employeePositions;
select * from person_table;

select * from Employers join disabled_person_table on Employers.employeeId = disabled_person_table.employee_id;