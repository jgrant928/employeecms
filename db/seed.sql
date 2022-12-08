INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Marketing');

SELECT * FROM department;

-- engineering dept has engineers, project managers & engineering managers
-- finance dept has accountants & finance managers
-- marketing dept has marketing managers & marketing analysts
-- sales dept has sales managers & sales reps

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1),
    ('Sales Rep', 80000, 1),
    ('Engineering Manager', 120000, 2),
    ('Engineer', 100000, 2),
    ('Project Manager', 110000, 2),
    ('Finance Manager', 125000, 3),
    ('Accountant', 95000, 3),
    ('Marketing Manager', 115000, 4),
    ('Marketing Analyst', 90000, 4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Sally', 'Smith', 3, NULL),
    ('Bob', 'Smith', 4, 3),
    ('Sam', 'Smith', 5, 3),
    ('Sue', 'Jones', 6, NULL),
    ('Bill', 'Jones', 7, 6),
    ('Jill', 'Jones', 8, NULL),
    ('Joe', 'Jones', 9, 8);

SELECT * FROM employee;

