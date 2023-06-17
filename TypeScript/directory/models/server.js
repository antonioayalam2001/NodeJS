"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Routers
const user_1 = __importDefault(require("../routes/user"));
//Database Connection
const connection_1 = require("../db/connection");
class Server {
    constructor() {
        this.paths = {
            userRoute: "/api/users"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.middlewares();
        this.dbConnection();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.db.authenticate();
                console.log("Database Connected Successfully");
            }
            catch (e) {
                throw new Error("Error while trying to connect the database");
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Reading Body
        this.app.use(express_1.default.json());
        //Static folder
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.paths.userRoute, user_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on  PORT number  : " + this.port);
        });
    }
}
//Exportanto una clase
exports.default = Server;
//# sourceMappingURL=server.js.map