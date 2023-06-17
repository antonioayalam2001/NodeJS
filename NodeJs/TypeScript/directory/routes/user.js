"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usersController_1 = require("../controller/usersController");
const dbValidators_1 = require("../helpers/dbValidators");
const validateFields_1 = require("../middlewares/validateFields");
const router = (0, express_1.Router)();
router.get("/", usersController_1.getUsers);
router.get("/:id", usersController_1.getUser);
router.post("/", [
    (0, express_validator_1.check)('email', "Email must be provided ").notEmpty(),
    (0, express_validator_1.check)('email', "This is not an email").isEmail(),
    (0, express_validator_1.check)("username", "Username must be added").notEmpty(),
    (0, express_validator_1.check)("email").custom(dbValidators_1.validateEmail),
    validateFields_1.validateFields
], usersController_1.createUser);
router.put("/:id", [
    (0, express_validator_1.check)('id').custom(dbValidators_1.existsUser),
    validateFields_1.validateFields
], usersController_1.updateUser);
router.delete("/deleteAll", [], usersController_1.deleteAll);
router.delete("/:id", [
    (0, express_validator_1.check)("id", "Id must be provided").notEmpty().custom(dbValidators_1.existsUser),
    validateFields_1.validateFields
], usersController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map