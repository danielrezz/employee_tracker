const mysql = require('mysql2');
const inquirer = require('inquirer');
const figlet = require('figlet');
const express = require("express");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'drum1007',
  database: 'employees_mainDB',
});

connection.connect(() => {
    figlet('Employee Tracker', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
        mainMenu();
        // connection.end();
    });
});

function mainMenu() {

    const VIEW_EMPLOYEES = "View all employees";
    const VIEW_DEPARTMENTS = "View all departments";
    const VIEW_ROLES = "View all roles";
    const ADD_EMPLOYEE = "Add new employee";
    const ADD_DEPARTMENT = "Add new department";
    const ADD_ROLE = "Add new role";
    const UPDATE_EMPLOYEE = "Update employee role";
    const DELETE_EMPLOYEE = "Delete existing employee";

    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                VIEW_EMPLOYEES,
                VIEW_DEPARTMENTS,
                VIEW_ROLES,
                ADD_EMPLOYEE,
                ADD_DEPARTMENT,
                ADD_ROLE,
                UPDATE_EMPLOYEE,
                DELETE_EMPLOYEE,
                "DONE"
            ]
        })
        .then(answers => {

            switch(answers.menu) {
                case VIEW_EMPLOYEES:
                    allEmployees();
                    break;
                case VIEW_DEPARTMENTS:
                    allDepartments();
                    break;
                case VIEW_ROLES:
                    allRoles();
                    break;
                case ADD_EMPLOYEE:
                    addEmployee();
                    break;
                case ADD_DEPARTMENT:
                    addDepartment();
                    break;
                case ADD_ROLE:
                    addRole();
                    break;
                case UPDATE_EMPLOYEE:
                    updateEmployee();
                    break;
                case DELETE_EMPLOYEE:
                    deleteEmployee();
                    break;
                default:
                    connection.end();
            };
        });
};

async function allEmployees(employeeslist) {
    const SQL_STATEMENT = `SELECT employees.employee_id, employees.first_name, employees.last_name, role.title, employees.manager_id
    FROM employees
    INNER JOIN role
    ON employees.role_id = role.role_id`;

    const TEMP_SQL_STATEMENT = `SELECT * FROM employees`;

    const [rows,fields] = await connection.promise().query(TEMP_SQL_STATEMENT, employeeslist);

    console.table(rows);
    mainMenu();
};

async function allDepartments(dept) {
    const SQL_STATEMENT = `SELECT * FROM department`;

    const [rows,fields] = await connection.promise().query(SQL_STATEMENT, dept);

    console.table(rows);
    mainMenu();
};

async function allRoles(roles) {
    const SQL_STATEMENT = `SELECT role.role_id, role.title, role.salary FROM role`;

    const [rows,fields] = await connection.promise().query(SQL_STATEMENT, roles);

    console.table(rows);
    mainMenu();
};

function addEmployee() {

    inquirer
        .prompt([
        {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name"
        },
        {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name"
        },
        {
        name: "role_id",
        type: "list",
        message: "What is the employee's role?",
        choices: [
            "Boss",
            "Back-End Developer",
            "Content Strategist",
            "Database Administrator",
            "Front-End Developer",
            "Salesperson",
            "Social Media Manager"
        ]},
        {
        name: "manager_id",
        type: "list",
        message: "Who is the employee's manager?",
        choices: [
            "Daniel",
            "Kaylee"
        ]}
    ])
        .then(async function (answers) {
            const SQL_STATEMENT = "INSERT INTO employees SET ?";

            const [rows, fields] = await connection.promise().query(SQL_STATEMENT,
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    role_id: 0, //need to work on setting this up
                    manager_id: 0
                },
                function (req, res) {
                    console.table(rows);
                }).catch(e => console.log(e));
            console.log("Employee successfully added!");
            mainMenu();
        });
};

function addDepartment() {

    inquirer
        .prompt([
        {
        name: "dept_name",
        type: "input",
        message: "What is the name of this department?"
        },
        {
        name: "dept_id",
        type: "input",
        message: "What is the ID of this department?"
        }
    ])
        .then(async function (answers) {
            const SQL_STATEMENT = "INSERT INTO department SET ?";

            const [rows, fields] = await connection.promise().query(SQL_STATEMENT,
                {
                    department_name: answers.dept_name,
                    department_id: answers.dept_id
                },
                function (req, res) {
                    console.table(rows);
                }).catch(e => console.log(e));
            console.log("Department successfully added!");
            mainMenu();
        });
};

function addRole() {

    inquirer
        .prompt([
        {
        name: "title",
        type: "input",
        message: "What is the title of this role?"
        },
        {
        name: "salary",
        type: "input",
        message: "What is the salary of this role?"
        }
    ])
        .then(async function (answers) {
            const SQL_STATEMENT = "INSERT INTO role SET ?";

            const [rows, fields] = await connection.promise().query(SQL_STATEMENT,
                {
                    title: answers.title,
                    salary: answers.salary
                },
                function (req, res) {
                    console.table(rows);
                }).catch(e => console.log(e));
            console.log("Role successfully added!");
            mainMenu();
        });
};


function updateEmployee() {
 
    inquirer
        .prompt([
        {
        name: "employee_id",
        type: "input",
        message: "What is the ID of the employee you would like to update?"
        }
    ])
        .then(async function (answers) {
            const SQL_STATEMENT = "UPDATE employees SET ? WHERE employees.employee_id = ?";

            // const [rows, fields] = await connection.promise().query(SQL_STATEMENT,
            //     {
            //         title: answers.title,
            //         salary: answers.salary
            //     },
            //     function (req, res) {
            //         console.table(rows);
            //     }).catch(e => console.log(e));                                           STILL NEED TO FIX!!
            console.log("System error... Please try again later.");
            mainMenu();
        });
};


function deleteEmployee() {

    inquirer
        .prompt([
            {
                name: "employeeID",
                type: "input",
                message: "What is the Employee's ID number?"
            }
        ])
        .then(function (answer) {
            const SQL_STATEMENT = "DELETE FROM employees WHERE employee_id = ?";

            if (answer.employeeID) { //figure out how to get IF statement working 
                connection.query(SQL_STATEMENT, answer.employeeID, function(err, res) {
                    if (err) throw err;
                    console.log("The employee has been successfully removed.");
                    mainMenu();  
                });
            } else {
                console.log("Please enter a valid employee ID.");
                mainMenu();
            }          
        });
};



// function updateEmployee() {

//     let roleTable = [
//         {
//             id: 1,
//             title: "Back-End Developer"
//         },
//         {
//             id: 2,
//             title: "Social Media Manager"
//         },
//         {
//             id: 3,
//             title: "Salesperson"
//         },
//         {
//             id: 4,
//             title: "Salesperson"
//         },
//         {
//             id: 5,
//             title: "Salesperson"
//         },
//         {
//             id: 6,
//             title: "Salesperson"
//         },
//         {
//             id: 7,
//             title: "Salesperson"
//         },
//     ];

//     inquirer
//         .prompt([
//         {
//         name: "role",
//         type: "list",
//         message: "What role would you like to update?",
//         choices: roleTable.map(role => { role.title })
//         }
//     ])
//         .then(function (answers) {

//             const SQL_STATEMENT = `INSERT INTO employees (first_name, last_name)
//             VALUES (${ answers.firstname }, ${ answers.lastname });`;

//             connection.query(SQL_STATEMENT);  //fix this connection!!
//             console.log("Employee successfully added!");
//             // console.table(rows);
//             mainMenu();
//         });
// };