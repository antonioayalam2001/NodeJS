const {
      Role, Usuario, Category, Product
} = require('../models')


const isValidRole = async (role = '') => {
      const existeRol = await Role.findOne({rol: role})
      if (!existeRol) {
            //Error personalizado del mismo Express Validator, no romple la aplicacion
            throw new Error('El role no se encuentra registrado en la base de Datos')
      }
      return true;
}

const emailExists = async (email = '') => {
      //Verifying if email exists
      const exists = await Usuario.findOne({email})
      if (exists) {
            throw new Error(`El correo : ${email}  ya se encuentra registrado en la base de datos`)
      }
      return true;
}

const userExists = async (id) => {
      const user = await Usuario.findById(id);
      if (!user) {
            throw new Error(`El ${id} no se encuentra en la base de datos`)
      }
      return true;
}

const categoryExists = async (id) => {
      const category = await Category.findById(id);
      if (!category) {
            throw new Error(`El ${id} no se encuentra en la base de datos`)
      }
      return true;
}

const productExists = async (id) => {
      const product = await Product.findById(id);
      if (!product) {
            throw new Error(`This ${id} is not registered in the Database system `)
      }
      return true;
}
const categoryName = async (category) => {
      const categoryExists = await Category.findOne({name: category.toUpperCase(), state: true});
      if (!categoryExists || categoryExists.state === false) {
            throw new Error(`This category ${category} is not registered in the Database system try with another category `)
      }
}

// const allowedCollections = (collection = "" , allowedCollections = [] ) => {
//       if (! allowedCollections.includes(collection)){
//             throw new Error('This category is not allowed to this operation')
//       }
//       return true;
// }

module.exports = {
      // allowedCollections,
      emailExists,
      isValidRole,
      userExists,
      categoryExists,
      categoryName,
      productExists
}