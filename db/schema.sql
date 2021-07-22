DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employeeRole (
    id INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL (10,4) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)

);