'use strict'
const express = require ( "express" ) ,
    morgan = require ( 'morgan' ) ,
    app = express () ,
    path = require ( "path" ) ,
    favicon = require ( "serve-favicon" ) ,
    pug = require ( "pug" ) ,
    ejs = require ( "ejs" ) ,
    routeIndex = require ( "./routes/index" ) ,
    // Esta cachando todo lo que venga exportado de este modulo de la forma:
    // module.exports = router;
    routeHome = require ( "./routes/home" ) ,
    routeEjs = require ( './routes/ejsPage' ) ,
    routeFirstPage = require ( './routes/firstPage' ) ,
    viewsURL = path.join ( __dirname , "views" ) ,
    logoURL = `${ __dirname }/public/img/logoCompleto.png` ,
    publicDir = express.static ( path.join ( __dirname , "public" ) ) ,
    PORT = process.env.PORT || 3000;

// view engine setup
app
    // Setting up the views to our ptoject
    .set ( 'views' , viewsURL )
    // .set('view engine', 'ejs')
    // Utilizar pug
    .set ( 'view engine' , 'pug' )
    .set ( 'port' , PORT )
    // Starting the middlewares
    .use ( favicon ( logoURL ) )
    // Nos muestra las peticiones que se estan realizando por HTTP (cada que entramos a una página  se muestra como una petición)
    // Es como el logger de recursos que aparece desde el navegador
    .use ( morgan ( 'dev' ) )
    .use ( publicDir )
    // enrouter middleware
    .use ( '/' , routeIndex )
    .use ( '/home' , routeHome )
    .use ( '/firstPage' , routeFirstPage )
    .use ( '/ejsPage' , routeEjs )

module.exports = app;


   