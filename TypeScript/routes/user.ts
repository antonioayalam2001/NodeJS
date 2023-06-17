import {Router} from "express";
import {check} from "express-validator";
import {createUser, deleteAll, deleteUser, getUser, getUsers, updateUser} from "../controller/usersController";
import {existsUser, validateEmail} from "../helpers/dbValidators";
import {validateFields} from "../middlewares/validateFields";

const router = Router();

router.get("/",getUsers);
router.get("/:id",getUser);
router.post("/",[
    check('email',"Email must be provided ").notEmpty(),
    check('email',"This is not an email").isEmail(),
    check("username","Username must be added").notEmpty(),
    check("email").custom(validateEmail),
    validateFields
] ,createUser);
router.put("/:id",[
    check('id').custom(existsUser),
    validateFields
] ,updateUser)
router.delete("/deleteAll",[
] ,deleteAll)
router.delete("/:id",[
    check("id","Id must be provided").notEmpty().custom(existsUser),
    validateFields
] ,deleteUser)

export default router;