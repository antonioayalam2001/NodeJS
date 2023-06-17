const {Router} = require('express');
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
router.get('/', usuariosGet);
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete);

module.exports = router;