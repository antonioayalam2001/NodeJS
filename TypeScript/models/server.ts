import express , {Application} from 'express'
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

//Routers
import userRoutes from "../routes/user";
//Database Connection
import {db} from "../db/connection";
class Server {
//    Se deben especificar las propiedades anteriormente en Typescript
    private app : Application;
    private port: string;
    private paths = {
        userRoute: "/api/users"
    };
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000"
        this.middlewares();
        this.dbConnection()
        this.routes();

    }

    async dbConnection () {
        try{
            await db.authenticate();
            console.log("Database Connected Successfully")
        }catch (e){
            throw new Error("Error while trying to connect the database")
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Reading Body
        this.app.use(express.json());
        //Static folder
        this.app.use(express.static("public"))
    }

    routes(){
        this.app.use(this.paths.userRoute,userRoutes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Server running on  PORT number  : " + this.port);
        })
    }
}

//Exportanto una clase
export default Server;