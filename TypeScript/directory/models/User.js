"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
//Mismos campos que nuestra tabla ya tenga
const Usuario = connection_1.db.define("user", {
    UserName: {
        type: sequelize_1.DataTypes.STRING
    },
    State: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    Email: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Usuario;
//# sourceMappingURL=User.js.map