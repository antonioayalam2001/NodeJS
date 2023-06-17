/*
*  Eventos connection y disconnect
*  Creación de eventos propios
* emit() :  COMUNICA MENSAJE A TODOS LOS CLIENTES CONECTADOS
*  broadcast.emit() : Se counica un mensaje a todos los clientes EXCEPTO AL QUE LOS ORIGINA
*
*
* */

'use sctric'
let http = require('http').createServer(server),
    fs = require('fs'),
    io = require('socket.io')(http),
    connections = 0,
    PORT = 3000;

function server (req,res) {
    try{
        const data = fs.readFileSync('server.html')
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data,'utf-8')
    }catch(error){
        console.log(error)
    }
}

http.listen(PORT)
console.log('Servidor corriendo en el puerto: ' , PORT)

io.on('connection', (socket) => {
    connections++
    socket.emit('hello',{ message : 'Se accede mediante data. nombre del objeto que mandamos' })

    socket.on('otro evento que me invente',(data)=>{
            console.log(data)
        })

    // socket.emit('connect users' ,
    //     {
    //     numbers: connections
    //     }
    // )

    socket.broadcast.emit('connect users', { numbers : connections })

    socket.on('disconnect',()=>{
        console.log(connections)
        connections--
        console.log(connections)
        socket.broadcast.emit('connect users', { numbers : connections })

    })
    // setTimeout(() => socket.disconnect(true), 5000);

        socket.to('connection').emit('connect users',{numbers : connections})
        //Solo al socket
        // socket.emit('some event', { someProperty: 'Alguien se conecto', otherProperty: 'other value' }); // This will emit the event to all connected sockets
//    Lo manda a todos
        socket.broadcast.emit('some event', { someProperty: 'Alguien se conecto', otherProperty: 'other value' }); // This will emit the event to all connected sockets
})



