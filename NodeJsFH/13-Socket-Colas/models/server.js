const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {
            home : "/home"
        };

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        this.app.use(express.json())
        this.app.use(bodyparser.urlencoded({extended: true}))

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.paths.home, require('../routes/home'));
        
    }

    sockets() {

        this.io.on('connection', (socket)=> {
            socketController(socket,this.io)
        } );

    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}
module.exports = Server;