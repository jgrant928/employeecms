const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const ascart = require('asciiart-logo');
const { createConnection } = require('net');

// Connect to database

const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'employee_db'
    });

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    init();
});

init = () => {
    const logoText = ascart({ name: 'Employee Manager' }).render();
    console.log(logoText);
    start();
}

const start = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'Exit'
            ]
        }
    ])

    .then((answer) => {
        switch (answer.choice) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    }

    )
}

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'What is the employee\'s role ID?'
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'What is the employee\'s manager ID?'
        }
    ])
    .then((answer) => {
        connection.query('INSERT INTO employee SET ?', {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID,
            manager_id: answer.managerID
        }, (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
    .then((answer) => {
        connection.query('INSERT INTO department SET ?', {
            name: answer.department
        }, (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    });
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'departmentID',
            message: 'What is the department ID of the role?'
        }
    ])
    .then((answer) => {
        connection.query('INSERT INTO role SET ?', {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentID
        }, (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    });
}

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleID',
            message: 'What is the employee\'s new role ID?'
        },
        {
            type: 'input',
            name: 'employeeID',
            message: 'What is the employee\'s ID?'
        }
    ])
    .then((answer) => {
        connection.query('UPDATE employee SET ? WHERE ?', [{
            role_id: answer.roleID
        },
        {
            id: answer.employeeID
        }], (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    });
}

// Path: package.json





