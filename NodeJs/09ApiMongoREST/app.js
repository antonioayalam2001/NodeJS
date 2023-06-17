'use strict'
// bodyParser
//    Works to the handle of information sended trough the form from the html or the view template
//
// Respuesta de los datos en forma de JSON
// .use(bodyParser.json())

const express = require ( 'express' ) ,
    app = express () ,
    morgan = require ( 'morgan' ) ,
    restfull = require ( 'express-method-override' ) ( '_method' ) ,
    path = require ( 'path' ) ,
    favicon = require ( 'serve-favicon' ) ,
    bodyParser = require ( 'body-parser' ) ,
    viewsURL = path.join ( __dirname , 'views' ) ,
    logoURL = `${ __dirname }/public/img/logoCompleto.png` ,
    publicDir = express.static ( path.join ( __dirname , 'public' ) ) ,
    PORT = process.env.PORT || 3000
//_method -> elemento oculto  que estamos agregando al formulario
//Lo podemos llamar como queramos

//Routes declaration
const routes = require ( './routes/movie-router' )
app.set ( 'views' , viewsURL )
    .set ( 'view engine' , 'pug' )
    .set ( 'port' , PORT )
    .use ( morgan ( 'dev' ) )
    .use ( favicon ( logoURL ) )
    //Pasar a formato JSON
    .use ( bodyParser.json () )
    //Permite que el modo de encriptado de la información mandada mediante el formuario sea de la forma :
    //      application/x-www-form-urlencoded
    //     .use(bodyParser.urlencoded({extended:false}))
    .use ( bodyParser.urlencoded ( { extended : false } ) )
    .use ( restfull )
    .use ( publicDir )
    .use ( routes )

module.exports = app