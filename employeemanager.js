const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password1234',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    runChoices();
});

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
            'EXIT',

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

            case 'EXIT':
                connection.end();
                break;

        }
    });
};

const employeeDisplay = () => {
    inquirer
    .prompt({
        name: 'employee',
        type: 'confirm',
        message: 'Employee list?'
    })
    .then(() => {
        const query = 'SELECT * FROM employee';
        connection.query(query, (err,res) => {
            console.table(res);
            console.log(err);
            runChoices()
        })
    })
};

const departmentDisplay = () => {
    inquirer
    .prompt({
        name: 'department',
        type: 'confirm',
        message: 'Department list?'
    })
    .then(() => {
        const query = 'SELECT * FROM department';
        connection.query(query, (err,res) => {
            console.table(res);
            console.log(err);
            runChoices()
        })
    })
};

const roleDisplay = () => {
    inquirer
    .prompt({
        name: 'role',
        type: 'confirm',
        message: 'View Employee Role?'
    })
    .then(() => {
        const query = 'SELECT * FROM employee_role';
        connection.query(query, (err,res) => {
            console.table(res);
            console.log(err);
            runChoices()
        })
    })
};

const departmentDisplay = () => {
    inquirer
    .prompt({
        name: 'department',
        type: 'confirm',
        message: 'Department list?'
    })
    .then(() => {
        const query = 'SELECT * FROM department';
        connection.query(query, (err,res) => {
            console.table(res);
            console.log(err);
            runChoices()
        })
    })
};

const addEmployee = () => {
    inquirer
    .prompt({
        name: 'add employee',
        type: 'input',

    })
}

// const createProduct = () => {
//     console.log('Inserting a new product...\n');
//     const query = connection.query(
//       'INSERT INTO products SET ?',
//       {
//         flavor: 'Rocky Road',
//         price: 3.0,
//         quantity: 50,
//       },
//       (err, res) => {
//         if (err) throw err;
//         console.log(`${res.affectedRows} product inserted!\n`);
//         // Call updateProduct AFTER the INSERT completes
//         updateProduct();
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   };