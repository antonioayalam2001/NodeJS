'use strict'
const express = require('express'),
    //Inicialización
    PORT = process.env.PORT || 3000,
    path = require('path'),
    //static position from out public dir
    publicDir = express.static(path.join(__dirname,'public')),
    app = express(),
    socketIO = require('socket.io'),
    http= require('http'),
    server = http.createServer(app),
    io = socketIO(server)

//Sockets
require('./socket')(io)

//    Settings
app.set('port',PORT)

//    Middleware
    .use(publicDir)
// add this

//    Static files

//     Starting server

server.listen(app.get('port') , ()  => {
    console.log('Server running on Port : ', app.get('port'))
})

