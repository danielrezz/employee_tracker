const mysql = require('mysql2');
const inquirer = require('inquirer');
const figlet = require('figlet');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'drum1007',
  database: 'employees_mainDB',
});

connection.connect(() => {
figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    mainMenu();
    connection.end();
});
//   songSearch();
//   artistSearch("bing crosby");
//   songSearch("my heart will go on");
//   songAndAlbumSearch("the beatles");
});

function mainMenu() {

    const VIEW_EMPLOYEES = "View all employees";
    const VIEW_DEPARTMENTS = "View all departments";
    const VIEW_ROLES = "View all roles";
    const ADD_EMPLOYEE = "Add new employee";
    const ADD_DEPARTMENT = "Add new department";
    const ADD_ROLE = "Add new role";
    const UPDATE_EMPLOYEE = "Update employee role";

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
                "I'm done"
            ]
        })
        .then(answers => {

            switch(answers.name) {
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
                default:
                    connection.end();
            };
        });
};

async function allEmployees(employeeslist) {
    const SQL_STATEMENT = `SELECT * FROM employees`;

    const [rows,fields] = await connection.promise().query(SQL_STATEMENT, employeeslist);

    console.table(rows);
};




// function allEmployees() {

//     connection.query("SELECT * FROM employees;", function(err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end(); //needed to end in last function
//     });
// };
