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
    afterConnection();
});
//   songSearch();
//   artistSearch("bing crosby");
//   songSearch("my heart will go on");
//   songAndAlbumSearch("the beatles");
});

function afterConnection() {

    connection.query("SELECT * FROM employees;", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end(); //needed to end in last function
    });
};
