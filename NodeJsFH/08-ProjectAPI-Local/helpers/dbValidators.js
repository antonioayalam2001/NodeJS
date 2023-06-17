const Role = require("../models/role");
const Usuario = require("../models/user");


const isValidRole = async (role = '') => {
      const existeRol = await Role.findOne({rol: role})
      if (!existeRol) {
            //Error personalizado del mismo Express Validator, no romple la aplicacion
            throw new Error('El role no se encuentra registrado en la base de Datos')
      }
}

const emailExists = async (email = '') => {
      //Verifying if email exists
      const exists = await Usuario.findOne({email})
      if (exists) {
            throw new Error(`El correo : ${email}  ya se encuentra registrado en la base de datos`)
      }
}

const userExists = async(id) =>{
      const user = await Usuario.findById(id);
      if (!user){
            throw new Error(`El ${id} no se encuentra en la base de datos`)
      }
}

module.exports = {
      isValidRole,
      emailExists,
      userExists
}