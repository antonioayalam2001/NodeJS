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
exports.existsUser = exports.validateEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const validateEmail = (email = " ") => __awaiter(void 0, void 0, void 0, function* () {
    const existsEmail = yield User_1.default.findOne({ where: { Email: email } });
    if (existsEmail) {
        throw new Error("This email is already in databse System");
    }
    return true;
});
exports.validateEmail = validateEmail;
const existsUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield User_1.default.findOne({ where: { id } });
    if (!existsUser) {
        throw new Error("This id does not belong to any user in the database System");
    }
    // @ts-ignore
    const { State } = existsUser.dataValues;
    if (!State) {
        throw new Error("The user is not in the database System");
    }
    return true;
});
exports.existsUser = existsUser;
//# sourceMappingURL=dbValidators.js.map