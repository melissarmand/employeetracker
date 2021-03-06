USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL (10,4) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)

);



SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;