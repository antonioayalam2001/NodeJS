const express = require('express');
const http = require('http');
// IO = esta es la comunicacion del backend
const io = require('socket.io');
require('./sockets/socket');
const cors = require("cors")
const {socketController} = require("./sockets/socket");

class Server {
    constructor() {
        this.app = express()
          this.PORT = process.env.PORT || 3000;
          this.server = http.createServer(this.app)
          this.io =io(this.server)

          this.middlewares()
          //Sockets Configuration
          this.sockets()
    }

    middlewares(){
          this.app.use(cors());
          this.app.use(express.static("public"))
    }

    routes (){

    }
      sockets(){
            //socket makes the reference to the client who is connected
            this.io.on('connection' , (socket)=>{
                  socketController(this.io,socket)
            })
      }


    start() {
          this.server.listen(this.PORT,()=>{
                console.log("Server running on : " , this.PORT);
          })
    }

}

module.exports = Server