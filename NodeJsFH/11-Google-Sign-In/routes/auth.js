const {Router} = require('express');
const {check} = require('express-validator');
const {validateField} = require("../middleware/validate_fields");
const {loginPost, googleSign, usuarioRegister, logOut} = require("../controllers");
const router = Router();


router.get('/register',usuarioRegister);

router.post('/login',
    [
        check('email','Email must be provided').isEmail(),
        check('password','Password must be provided').not().isEmpty(),
        validateField
    ]
    ,loginPost);

router.post('/google',
    [
          check('token','El ID Token es necesario').not().isEmpty(),
          validateField
    ]
    ,googleSign);

router.get('/logout'
    ,logOut);

module.exports = router;
