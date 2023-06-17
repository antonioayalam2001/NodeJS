"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
exports.db = new sequelize_1.Sequelize("Users", "root", "@200120Tm", {
    dialect: "mysql",
    host: "localhost",
    //    Every command from the database allows all the SQL in the terminal
    logging: true
});
//# sourceMappingURL=connection.js.map