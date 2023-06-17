const express = require('express');
class Server {
      constructor() {
            this.paths = {
                  user : '/api/users'
            }
            this.app = express();
            this.PORT = process.env.PORT || 3000;
      //      If you want to implement sockets :
      //       this.server = require('http').createServer(this.app);
      //       this.io = require('socket.io')(this.server);
      }


      middlewares(){
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
            //Lecture and parsing from the body
            this.app.use(express.json())
            //Nos permite recibir los URL search params por medio de una petición fetch
            this.app.use(bodyparser.urlencoded({extended: true}))
            //Configurando sesiones
            this.app.use(session(sessionConfig))
            //Permite realizar la lecutra de las cookies
            this.app.use(cookieparser())
            //PUBLIC DIRECTORY
            this.app.use(express.static('public'));
            //File Uploader
            this.app.use(fileUpload({
                  useTempFiles : true,
                  tempFileDir : '/tmp/',
                  createParentPath: true
            }));

      }

      routes(){
            this.app.use()
      }

      // sockets(){
      //       this.io.on('connection',socket=>{
      //             socketController(socket,this.io)
      //       })
      // }

      start(){
            this.app.listen(this,PORT, ()=>{
                  console.log("Server running on PORT" + this.PORT)
            })
      //      Using SOCKETS
      //       this.server.listen(this,PORT, ()=>{
      //             console.log("Server running on PORT" + this.PORT)
      //       })
      }
}

module.exports = Server;