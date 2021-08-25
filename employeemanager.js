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
};

const employeeDisplay = () => {
    inquirer
        .prompt({
            name:'employee',
            type:'confirm',
            message: 'View all employees now?',
        })
        .then((answer) => {
            const query = 'SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?';
            connection.query(query, {})
        })
        runChoices();
};

const departmentDisplay = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'confirm',
            message: 'View all departments now?',
        })
        .then((answer) => {
            const query = 'SELECT * FROM employee';
            connection.query
        });

        runChoices();
};

const roleDisplay = () => {
    inquirer    
        .prompt({
            name: 'role',
            type: 'confirm',
            message: 'View all departments now?',
        })
        .then((answer) => {
            const query = 'SELECT '
        });
        runChoices();
};

const addEmployee = () => {
    inquirer
        .prompt([
         {
            name: 'firstname',
            type: 'input',
            message: 'What is the employees first name?',
            
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'What is the employees last name?',
            

        },
        {
            name: 'manager',
            type: 'input',
            message: 'Who is the employees manager?',
            validate(value) {
                if (isNaN(value) === false) {
                    return true;
              }
              return false;
                }, 

        },
        {
            name: 'role',
            type: 'input',
            message: 'What is the employees role?',
            validate(value) {
            if (isNaN(value) === false) {
                return true;
          }
          return false;
            }, 

        },     
        ])
        .then((answer) => {
            connection.query('INSERT INTO employee SET ?',
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                manager_id: answer.manager,
                role_id: answer.role
            },
            runChoices()
            )

        });

}
const addDepartment = () => {
    inquirer
    .prompt({
        name: 'department',
        type: 'input',
        message: 'What is the name of the new department?'
    })

    .then((answer) => {
        connection.query('INSERT INTO department SET ?',
        {
            department_name: answer.department,
        },
        runChoices()
        )
    })
};

const addRole = () => {
    inquirer
        .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of this role?',

        },

        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this role?',
            validate(value) {
                if (isNaN(value) === false) {
                    return true;
              }
              return false;
                }, 

        },

        {
            name: 'department',
            type:'input',
            message: 'What is the department id?',
            validate(value) {
                if (isNaN(value) === false) {
                    return true;
              }
              return false;
                }, 
        },
        ])
}

