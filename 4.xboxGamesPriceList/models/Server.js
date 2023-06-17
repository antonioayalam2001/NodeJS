const express = require ( 'express' );
const multer = require ( 'multer' );
const cors = require ( 'cors' );
require('dotenv').config();

class Server {
      constructor () {
            this.app = express ();
            this.PORT = 3000 || process.env.PORT;
            this.paths = {
                  getGamesRoute : '/api/games'
            }

            this.middlewares ();
            this.routes ();
      }


      middlewares () {
            this.app.use ( cors () );
      }

      routes () {
            this.app.use(this.paths.getGamesRoute , require('../routes/games'));
      }

      start () {
            this.app.listen ( this.PORT , () => {
                  console.log ( 'Server running on PORT ' , this.PORT );
            } )
      }

}

module.exports = Server;