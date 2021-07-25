const mysql = require('mysql');
const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const { allowedNodeEnvironmentFlags } = require('process');

const runChoices = () => {

    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: "What would you like to do?",
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update an employee role',

        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                employeeDisplay();
                break;
            
            case 'View all departments':
                departmentDisplay();
                break;

            case 'View all roles':
                roleDisplay();
                break;

            case 'Add an employee':
                addEmployee();
                break;
            
            case 'Add a department':
                addDepartment();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Update an employee role':
                updateRole();
                break;

        }
    });
}