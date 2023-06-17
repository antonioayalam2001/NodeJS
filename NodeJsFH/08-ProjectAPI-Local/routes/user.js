//NodeJS
const {Router} = require('express');
const {check, param} = require('express-validator');
//Middlewares
// const {validateField} = require("../middleware/validate_fields");
// const {validateJWT} = require("../middleware/validateJWT");
// const {validateAdminRole, tieneRol} = require("../middleware/validateRoles");


const {validateField, validateJWT, validateAdminRole, tieneRol} = require('../middleware')
const {isValidRole, emailExists, userExists} = require("../helpers/dbValidators");

//Controller
const {
      usuariosGet,
      usuariosPut,
      usuariosDelete,
      usuariosPost,
      usuariosPatch
} = require("../controllers/userController");

//Defining router
const router = Router();
//ENDPOINT mas comunes: PUT REST POST DELETE
router.get('/', [
    validateJWT,
    validateField
],usuariosGet);
//Mandando los Middlewares necesarios
router.post('/',
    [
          //Corroborando que no este vacio
          check('nombre', 'Nombre obligatorio').not().isEmpty(),
          //Corroborando que coincida con correo
          check('email', 'El correo no es valido').isEmail(),
          check('email').custom(emailExists),
          check('password', 'Contraseña con longitud corta').isLength({min: 6}),
          //custom manda el valor del campo ingresado, pero como solo recibimos ese campo podemos "obviarlo"
          // check('role').custom(     isValidRole   ),
          check('role').custom((role) => isValidRole(role)),
          //Permite realizar la verificacion de que no hubieorn errores
          validateField
    ]
    , usuariosPost);
router.put('/:id',
    [
          // check('id', 'No es un ID valido').isMongoId(),
          check('id').custom(userExists),
          check('role').custom((role) => isValidRole(role)),
          validateField
    ], usuariosPut);

router.patch('/', usuariosPatch)

//Recibimos el JWT por medio del header
router.delete('/:id',
    [
          validateJWT,
          //Forzosamente administrador
          // validateAdminRole,
          tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
          check('id', 'El ID ingresado no es valido para eliminar').isMongoId(),
          check('id').custom(userExists),
          validateField
    ], usuariosDelete);

module.exports = router;