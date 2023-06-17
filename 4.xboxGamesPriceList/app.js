require('dotenv').config();
const Server = require('./models/Server');

const serverInit = new Server();

serverInit.start();