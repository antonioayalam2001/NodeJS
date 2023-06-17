const {Router} = require('express');
const {check} = require('express-validator');
const {loginPost, googleSign, usuarioRegister, logOut, renewToken} = require("../controllers");
const {validateJWT, validateField} = require("../middleware");
const router = Router();


router.get('/register', usuarioRegister);
router.get('/', validateJWT , renewToken);

router.post('/login',
    [
          check('email', 'Email must be provided').isEmail(),
          check('password', 'Password must be provided').not().isEmpty(),
          validateField
    ]
    , loginPost);

router.post('/google',
    [
          check('token', 'El ID Token es necesario').not().isEmpty(),
          validateField
    ]
    , googleSign);

router.get('/logout'
    , logOut);

module.exports = router;
