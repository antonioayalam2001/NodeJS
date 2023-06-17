//Imports
import Server from "./models/server"
import dotenv from 'dotenv'
//Dotenv Config
dotenv.config()

const server = new Server()
server.listen();


