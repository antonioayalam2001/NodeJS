//Importaciones de NODE

//Importaciones de tercerros
require('dotenv').config();

//Importaciones propias
const Server = require('./models/server')
const server = new Server();
server.start();