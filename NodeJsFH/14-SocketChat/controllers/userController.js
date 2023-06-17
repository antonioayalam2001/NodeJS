const {response: res, request: req} = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcrypt');

const usuariosGet = async (req, res) => {
      console.log(req.session.usuario);
      const {limite = 5, desde = 0} = req.query;
      // const usuarios = await Usuario.find({state:true}).limit(limite).skip(desde),;
      // const usersCount =  await Usuario.countDocuments({state: true})
      const [users, total] = await Promise.all([
            Usuario.find({state: true}).limit(limite).skip(desde),
            Usuario.countDocuments({state: true})
      ]);
      res.json({total, limite, desde, users});
}

//Inserting a new User
const usuariosPost = async (req, res) => {
      //Si en el body vienen otros campos no existentes son ignorados
      const {nombre, email, password, role} = req.body;
      const usuario = new Usuario({nombre, email, password, role});
      //Encrypt password || Hash
      const saltRound = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, saltRound);
      //Save
      await usuario.save();
      // FORMA 2 de eliminar las propiedades
      // const resultado = usuario.toObject()
      // delete resultado.password
      // delete resultado.__v
      // console.log(resultado)
      //Mandando a otra página
      // res.redirect('http://google.com')
      res.status(200).json({
            usuario
      });
}

const usuariosPut = async (req, res) => {
      const {id} = req.params;
      const {_id, password, google, ...resto} = req.body;
      //Validar contra base de datos
      if (password) {
            //            Desea actualizar la contraseña
            const saltRound = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(password, saltRound);
      }
      const usuario = await Usuario.findByIdAndUpdate(id, resto);
      res.status(202).json(
          usuario
      );
}

const usuariosPatch = (req, res) => {
      res.status(403).json({
            msg: "patch API-Controller"
      });
}
const usuariosDelete = async (req, res) => {
      const {id} = req.params;
      //Borrando usuario Físicamente poco recomendado dado que perdemos tola información de dicho usuario
      // la cual podría ser útil posteriormente
      /*    Elimina los usuarios de la base de datos devuelve la cantidad de Usuarios eliminados y falso o verdadero
      *      const user = await  Usuario.deleteOne({_id : id})
      *
      * */
      /*
      * Elimina al usuario, pero nos devuelve el objeto eliminado
      *  const user = await  Usuario.findByIdAndRemove(id)
      * */
      const options = {returnDocument : 'after'}
      const usuario = await Usuario.findByIdAndUpdate(id , {$set : {state  : false}},options);
      // const usuario = await Usuario.findByIdAndUpdate(id , {state : false});
      res.status(403).json({
            msg: "delete API-Controller",
            usuario,
            usuarioAutenticado : req.user
      });
}

module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
}