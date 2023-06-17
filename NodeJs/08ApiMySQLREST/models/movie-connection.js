'use strict'
const mySQL = require('mysql')
const conf = require('./dbConf.json')
const dbOptions = {
        host: conf["my-sql"].host,
        user: conf["my-sql"].user,
        password: conf["my-sql"].password,
        port: conf["my-sql"].port,
        database: conf["my-sql"].database
};
//Estableciendo la conexion con la base de datos
const conexion = mySQL.createConnection(dbOptions)
conexion.connect((err)=>{
        if (err) console.log(err)
        console.log('Conexion establecida de forma exitosa : ' + conexion.threadId)
})
module.exports = conexion;

/*
console.log(conf.hasOwnProperty('my-sql').hasOwnProperty('host'))
console.log(Object.keys(conf))
console.log(dbOptions.hasOwnProperty('host'))
console.log(conf["my-sql"].host)
console.log(typeof conf)
console.log("Conexion: " + conf['my-sql'].host)

let person = {
        id:101,
        name:"Tony",
        lastName:'Mora'
}

let{id,name} = person;

console.log(id)
console.log(typeof name)
*/
