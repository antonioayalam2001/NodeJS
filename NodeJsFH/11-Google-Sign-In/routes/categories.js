const {Router} = require('express')
const {check} = require('express-validator');
const {validateField, validateJWT, validateAdminRole, tieneRol} = require('../middleware')
const {isValidRole, emailExists, userExists, categoryExists} = require("../helpers/dbValidators");
//Controller
const {
      getCategories,
      getCategoryById,
      insertCategory,
      updateCategoryById,
      deleteCategoryById,
      deleteCollectionCat
} = require("../controllers");
const router = Router()

//Route to access /api/categories
//Getting all the categories PUBLIC
router.get('/', getCategories);

//Delete everything in the collection
router.get('/deleteAll', [
      validateJWT,
      validateAdminRole,
      validateField
], deleteCollectionCat)

//Get id Getting just one category per ID
router.get('/:id', [
      check('id', 'Necesitas tener un id valido para Solicitar').custom(categoryExists),
      validateField
], getCategoryById)

//POST  -> Create category private (any role ----> Anyone with a token)
router.post('/', [
      validateJWT,
      check('name', "Name can not be empty").notEmpty(),
      check('description', 'Description can not be empty').notEmpty(),
      validateField
], insertCategory)
//PUT -> Update by ID (Anyone with a valid token)
router.put('/:id', [
      validateJWT,
      check('id', 'Necesitas tener un id valido para actualizar').custom(categoryExists),
      validateField
], updateCategoryById)
//DELETE -> Delete Category (Just if Role == Admin from active to inactive)
router.delete('/:id', [
      validateJWT,
      validateAdminRole,
      //This passes automatically the id to the function just as we needed
      check('id', 'Necesitas tener un id valido para eliminar').custom(categoryExists),
      validateField
], deleteCategoryById)
module.exports = router