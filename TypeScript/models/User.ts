import {DataTypes} from "sequelize";
import {db} from "../db/connection";
//Mismos campos que nuestra tabla ya tenga
const Usuario = db.define("user",{
    UserName : {
        type : DataTypes.STRING
    },
    State : {
        type : DataTypes.BOOLEAN
    },
    Email : {
        type : DataTypes.STRING
    }
})

export default Usuario;
