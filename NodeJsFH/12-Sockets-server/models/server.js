//Importaciones de Node
const {createServer} = require('http')
//Importaciones de Terceros
const dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const io = require('socket.io');
//Importaciones Propias
const {socketController} = require("../sockets/controller");

class Server {
      constructor() {
            this.app = express();
            this.PORT = process.env.PORT;
            //Server created with http
            this.server = createServer(this.app)
            //All the info of the sockets that are connected in the backend
            this.io =io(this.server)
            this.paths = {}
            //Middlewares
            this.middlewares()
            //Rutas de la aplicación
            this.routes();

            //Sockets Configuration
            this.sockets()
      }

      middlewares() {
            const sessionConfig = {
                  name: "session",
                  secret: process.env.SECRETORPUBLICKEY,
                  cookie: {
                        maxAge: 1000 * 60 * 60,
                        secure: false,
                        httpOnly: true
                  },
                  resave: false,
                  saveUninitialized: true
            }
            //CORS
            this.app.use(cors());
            //Configurando sesiones
            this.app.use(session(sessionConfig));
            //Permite realizar la lecutra de las cookies
            this.app.use(cookieparser());
            //PUBLIC DIRECTORY
            this.app.use(express.static('public'));
      }

      routes() {
            // this.app.use(this.paths.authPath, require('../routes/auth'));
      };

      sockets(){
            //socket makes the reference to the client who is connected
            this.io.on('connection' , socketController)
      }


      start() {
            this.server.listen(this.PORT, () => {
                  console.log('Listening from port number : ', this.PORT);
            })
      }
}

module.exports = Server;