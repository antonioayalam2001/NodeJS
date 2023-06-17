'use strict'
// Archivo para crear conexion con la base de datos

const mySQL = require('mysql'),
    //Utilizamos my-connection para poder implementarlo como Middleware en la ruta
    //express-myconnection Permitia la conexion como un middleware
    /*
    * Ventaja : Manejar la conexion desde otras rutas
    *
    * Desventaja :
    *                   Vuelve insegura a las conexiones
    * */
    myConnection = require('express-myconnection'),
    dbOptions = {
        host: 'localhost',
        user: 'root',
        password: 'Jillvalentine1',
        port: 3306,
        database: 'movies'
    };

let dbConMov = myConnection(mySQL, dbOptions, 'request');
module.exports = dbConMov;

// //OPCION DE CONEXION 2:
// const MYSQL = require('mysql')
// let connection = MYSQL.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'Jillvalentine1',
//         port: 3306,
//         database: 'movies'
// })
// connection.connect((err)=>{
//         if(!err){
//                 console.log('No hay error')
//         }else {
//                 console.log('Something went wrong')
//         }
// })
//
// module.exports = connection