const {Router} = require('express')
const {search, productByCategory} = require('../controllers')
const {check} = require('express-validator');
const {validateField} = require("../middleware");
const {categoryName} = require("../helpers/dbValidators");

const router = Router();
// searchPath: 'api/search'
//Usually is a get
router.get('/:collection/:search', search)
router.get('/products/:categoryName/:product', [
      check('categoryName',"Category does nos exists in database").custom(categoryName),
      validateField
], productByCategory)


module.exports = router
