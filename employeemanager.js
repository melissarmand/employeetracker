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


const addEmployee = () => {
    inquirer
    .prompt([{
        name: 'firstname',
        type: 'input',
        message: 'What is the employees first name?'

    },
    {
        name: 'lastname',
        type: 'input',
        message: 'What is the employees last name?'
    },
    {
        name: 'role',
        type: 'input',
        message: 'What is the employees role? (choose a number)'
    },
    {
        name: 'manager',
        type: 'input',
        message: 'Who is the employees manager? (choose 1-4)'
    }])
    .then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstname}', '${answer.lastname}', '${answer.role}', '${answer.manager}')`;
        connection.query(query, (err,res) => {
            console.log(err);
            runChoices()
        })
    })
};

const addDepartment = () => {
    inquirer
    .prompt({
        name: 'departmentname',
        type: 'input',
        message: 'What is the name of the new department?'
    })
    .then((answer) => {
        const query = `INSERT INTO department (department_name) VALUES ('${answer.departmentname}')`;
        connection.query(query, (err, res) => {
            console.log(err);
            runChoices()
        })
    })
};

const addRole = () => {
    inquirer
    .prompt([{
        name: 'title',
        type: 'input',
        message: 'What is the employees title?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the employees salary?'
    },
    {
        name: 'departmentid',
        type: 'input',
        message: 'What is the employees department id (choose 1-4)?'
    },

])
    .then((answer) => {
        const query = `INSERT INTO employee_role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.departmentid}')`;
        connection.query(query, (err, res) => {
            console.log(err);
            runChoices()
        })
    })
};

const updateRole = () => {
    inquirer
    .prompt([{
        name: 'employeename',
        type: 'input',
        message: 'Which employee would you like to update? (Please type employees first name)'
    },
    {
        name: 'updaterole',
        type: 'input',
        message: 'What is this employees new role?'
    },
    
]) 
.then((answer) => {
    const query = connection.query(
        'UPDATE employee SET ? WHERE ?', 
        [
            {
            role_id: answer.updateRole,
        },
        {
            first_name: answer.employeename
        },
        runChoices()
    ],
    ) 
})
}
