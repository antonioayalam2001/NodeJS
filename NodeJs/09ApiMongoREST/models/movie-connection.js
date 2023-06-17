'use strict'
const mongoose = require('mongoose')
const conf = require('./dbConf.json')
const Schema = mongoose.Schema
// Llave primaria que da por defecto Mongo, nosotros vamos a utilizar la propia de la base de IMDB
// ObjectId = Schema.ObjectId
let MovieSchema = new Schema({
        movie_id : "string",
        title : "string",
        release_year : "string",
        image : "string",
        rating : "string"
},{
        collection:"movie"
})

const dbOptions = {
        host: conf["mongo"].host,
        port: conf["mongo"].port,
        database: conf["mongo"].database
};
//Estableciendo la conexion con la base de datos
let MovieModel = mongoose.model('Movie',MovieSchema)
mongoose.connect(`mongodb:\/\/${conf["mongo"].host}/${conf["mongo"].database}`).catch(error=>{
        console.log(error)})
module.exports = MovieModel;
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
