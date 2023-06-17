'use strict'

var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 3000,
    path = require('path'),
    publicDir = (path.join(__dirname,'public')),
    publicD = express.static(`${__dirname}/public`)

app.use(publicD)
    .get('/', (req, res) => {
        res.sendFile(`${publicDir}/cliente.html`)
    })
    .get('/servidor',(req,res)=>{
        res.sendFile(`${publicDir}/servidor.html`)
    })

http.listen(port, () => {
    console.log('Iniciando Express y Socket.IO en localhost:%d', port)
})


io.on('connection',(socket)=>{
    socket.on('streaming',(image)=>{
        console.log(image)
        io.emit('play stream',image)
    })
})