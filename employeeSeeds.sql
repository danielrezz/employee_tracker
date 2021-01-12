DROP DATABASE IF EXISTS employees_mainDB;

CREATE database employees_mainDB;

USE employees_mainDB;

CREATE TABLE employees (
    employee_id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    role_id INTEGER (11),
    manager_id INTEGER (11) NULL,
    PRIMARY KEY (employee_id)
);

CREATE TABLE role (
    role_id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR (30),
    salary DECIMAL (10, 2),
    department_id INTEGER (11),
    PRIMARY KEY (role_id)
);

CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT,
    department_name VARCHAR (30),
    PRIMARY KEY (department_id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Daniel", "Reza", 1, 00000), ("Kaylee", "Reza", 1, 00000);

INSERT INTO department (department_id, department_name)
VALUES (1, "Admin"), (2, "Engineering"), (3, "Content"), (4, "Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Boss", 300000.00, 1), ("Back-End Developer", 250000.00, 2), ("Content Strategist", 200000.00, 3), 
("Database Administrator", 150000.00, 2), ("Front-End Developer", 250000.00, 2), ("Salesperson", 100000.00, 4), ("Social Media Manager", 200000.00, 3);

SELECT employees.first_name, employees.last_name, role.role_id, role.title, role.salary
FROM employees
RIGHT JOIN role
ON employees.role_id = role.role_id
WHERE role.role_id = 1 OR 2 OR 3;