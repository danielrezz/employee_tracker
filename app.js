const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'drum1007',

  database: 'employees_mainDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
//   songSearch();
//   artistSearch("bing crosby");
//   songSearch("my heart will go on");
//   songAndAlbumSearch("the beatles");
  connection.end();
});