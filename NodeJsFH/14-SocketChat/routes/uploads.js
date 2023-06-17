const {Router} = require('express');
const {check} = require('express-validator');
const {validateField, validateCollections, validateFile} = require("../middleware");
const {uploadFile, updateImgCloudinary, showImg, updateImageLocal, showImgLocal} = require("../controllers");

const router = Router();
//ROUTE : api/uploads

router.get('/:collection/:id', [validateCollections(['users', 'products']),
      check('id',"Id must be a valid MongoId").isMongoId(),
    validateField
],showImg)

//Upload File with an non existent file POST
router.post('/', validateFile, uploadFile)
//Update a file that already exists
router.put('/:collection/:id', [
      //Implemented as middleware
      validateCollections(['users', 'products']),
      check('id', 'Id must be a valid MongoId').isMongoId(),
      validateFile,
      //Implemented as a dbValidator function
      // check('collection',"Collection must exists").custom(c=> allowedCollections(c,['users','products'])),
      validateField
], updateImgCloudinary)

router.put('/local/:collection/:id', [
      //Implemented as middleware
      validateCollections(['users', 'products']),
      check('id', 'Id must be a valid MongoId').isMongoId(),
      validateFile,
      //Implemented as a dbValidator function
      // check('collection',"Collection must exists").custom(c=> allowedCollections(c,['users','products'])),
      validateField
], updateImageLocal)

router.get('/local/:collection/:id', [validateCollections(['users', 'products']),
      check('id',"Id must be a valid MongoId").isMongoId(),
      validateField
],showImgLocal)


module.exports = router