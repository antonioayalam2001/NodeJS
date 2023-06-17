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
exports.deleteAll = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { begin = 0, limitUser = 5 } = req.query;
    const users = yield User_1.default.findAll({ where: { State: true }, limit: Number(limitUser), offset: Number(begin) });
    const [activeCount, deletedCount] = yield Promise.all([
        yield User_1.default.count({ where: { State: true } }),
        yield User_1.default.count({ where: { State: false } })
    ]);
    res.status(200).json({
        msg: "Getting all users",
        users,
        activeCount,
        deletedCount,
        begin,
        limitUser
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const user = await Usuario.findOne({where:{id}});
    const user = yield User_1.default.findByPk(id);
    console.log(user);
    if (!user) {
        return res.status(404).json({
            msg: "User does not exists in this database  "
        });
    }
    res.status(200).json({
        msg: "Getting one users",
        user
    });
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const user = yield User_1.default.create({ UserName: body.username, Email: body.email, updatedAt: new Date().toLocaleString() });
    try {
        res.status(200).json({
            msg: "Creating User",
            user
        });
        yield user.save();
    }
    catch (e) {
        return res.status(401).json({
            msg: "Something went wrong"
        });
        console.log(e);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.findByPk(id);
    yield (user === null || user === void 0 ? void 0 : user.update({ Email: req.body.email }));
    res.status(200).json({
        msg: "Update User",
        user
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.update({ State: false }, { where: { id } });
        return res.status(200).json({
            msg: "User deleted",
        });
    }
    catch (e) {
        return res.status(403).json({
            msg: "Something went wrong",
            id
        });
    }
});
exports.deleteUser = deleteUser;
const deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.destroy({
            truncate: true
        });
        return res.status(200).json({
            msg: "Database Deleted"
        });
    }
    catch (e) {
        return res.status(403).json({
            msg: "Something went wrong",
        });
    }
});
exports.deleteAll = deleteAll;
//# sourceMappingURL=usersController.js.map