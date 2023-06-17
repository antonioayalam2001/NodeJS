const authController = require('./authController')
const categoriesController = require('./categoriesController')
const productController = require('./productController')
const searchController = require('./searchController')
const userController = require('./userController')
const fileController = require('./uploadsController')

module.exports = {
      ...authController,
      ...categoriesController,
      ...fileController,
      ...productController,
      ...searchController,
      ...userController
}
