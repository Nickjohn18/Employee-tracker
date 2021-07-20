USE employees_db;

-- Department seeds

INSERT INTO department(id, department_name)
VALUES 
(1, "Management"),
(2, "Front-End"),
(3, "Major Sales"),
(4, "MemberService");

INSERT INTO role(id, title, salary, department_id)
VALUES
(1, "General Manager", 11, 1),
(2, "Cashier", 100, 2),
(3, "Sales", 50, 3),
(4, "Auditor", 3.5, 4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Nick", "De Luna", 1, 1),
(2, "Lamp", "Nguyen", 2, 2),
(3, "Thach", "Mai", 3, 3),
(4, "Jeff", "Maisonet", 1, 1);

