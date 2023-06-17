import {Sequelize} from "sequelize";

export const db = new Sequelize("Users","root","@200120Tm",{
    dialect : "mysql",
    host : "localhost",
//    Every command from the database allows all the SQL in the terminal
    logging : true
})

