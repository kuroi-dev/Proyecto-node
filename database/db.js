const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(function (error){
    if(error){
        console.log('El error de conexion a MYSQL es : ' + error);
    }
    else{
        console.log('Conectado a DB');
    }
});

module.exports = connection;
