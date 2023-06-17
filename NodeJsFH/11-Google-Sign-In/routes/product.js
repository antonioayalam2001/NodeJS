const {Router} = require('express')
const {check} = require('express-validator');
const {validateField, validateJWT, validateAdminRole, tieneRol} = require('../middleware')
const {isValidRole, emailExists, userExists, ProductExists, productExists, categoryName} = require("../helpers/dbValidators");
//Controller
const {
      deleteProductById,
      deleteCollection,
      getProductById,
      getProducts,
      insertProduct,
      updateProductById
} = require("../controllers");
const router = Router()


//Route : /api/products
//Getting all the Products PUBLIC
router.get('/', getProducts);

//Delete everything in the collection
router.get('/deleteAll', [
      validateJWT,
      validateAdminRole,
      validateField
], deleteCollection)

//Get id Getting just one Product per ID
router.get('/:id', [
      check('id', 'Necesitas tener un id valido para Solicitar').custom(productExists),
      validateField
], getProductById)

//POST  -> Create Product private (any role ----> Anyone with a token)
router.post('/', [
      validateJWT,
      tieneRol('SALES_ROLE','ADMIN_ROLE'),
      check('name', "Name can not be empty").notEmpty(),
      check('description', 'Description can not be empty').notEmpty(),
      check('category', 'category can not be empty').notEmpty().custom(categoryName),
      validateField
], insertProduct)
//PUT -> Update by ID (Anyone with a valid token)
router.put('/:id', [
      validateJWT,
      check('id', 'The given Id is not a valid Mongo ID').isMongoId(),
      check('id', 'Necesitas tener un id valido para actualizar').custom(productExists),
      validateField
], updateProductById)

//DELETE -> Delete Product (Just if Role == Admin from active to inactive)
router.delete('/:id', [
      validateJWT,
      validateAdminRole,
      //This passes automatically the id to the function just as we needed
      check('id', 'Necesitas tener un id valido para eliminar').custom(productExists),
      validateField
], deleteProductById)

module.exports = router