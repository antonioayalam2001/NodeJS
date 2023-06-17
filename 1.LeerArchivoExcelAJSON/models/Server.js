const express = require ( 'express' );
require ( 'dotenv' ).config ();
const ejs = require("ejs");
const path = require('path');

class Server {
      constructor ( props ) {
            this.app = express();
            this.paths = {
                  uploadFile : '/upload',
                  viewsPath : path.join(__dirname,'../views')
            };
            this.PORT = 3000 || process.env.PORT;
            this.viewsMotor();
            this.middlewares();
            this.routes();
      }


      viewsMotor(){
            this.app.set('views',this.paths.viewsPath);
            this.app.set('view engine','ejs');
      }


      middlewares () {
            this.app.use(express.json());
            this.app.use(express.static('public'))
      }

      routes(){
            this.app.use(this.paths.uploadFile,require('../routes/uploadFile'));
      }

      start () {
            this.app.listen(this.PORT, () => {
                  console.log ('App running on PORT: ', this.PORT);
            })
      }
}


module.exports = Server;