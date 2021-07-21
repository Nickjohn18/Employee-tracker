DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;



-- table for department
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);
-- table for role
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- table for employee
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
    FOREIGN KEY (role_id) REFERENCES role(id)
    FOREIGN KEY (manager_id) REFERENCES employee(id)

);

