const {response: res, request: req} = require('express')


const usuariosGet = (req, res) => {
      const {nombre = 'No name submited', apellido = 'No lastname', apikey = null, page = 1, limit = 10} = req.query;
      const {apikeyheader} = req.headers
      console.log(req.headers)
      res.json({
            msg: 'get API - controlador',
            nombre,
            apellido,
            apikey,
            page,
            limit,
            apikeyheader
      });
}
const usuariosPost = (req, res) => {
      //Informacion de un formualrio por ejemplo
      const {nombre = 'No name', edad} = req.body
      res.status(403).json({
            msg: "post API-Controller",
            nombre,
            edad
      });
}
const usuariosPut = (req, res) => {
      // URL de prueba : http://localhost:3000/api/users/22?saludo=hola&nombre=AntonioAyala&apellido=Mora
      const {id} = req.params;
      res.status(202).json({
            msg: "put API-Controller",
            id
      });
}

const usuariosPatch = (req, res) => {
      res.status(403).json({
            msg: "patch API-Controller"
      });
}
const usuariosDelete = (req, res) => {
      res.status(403).json({
            msg: "delete API-Controller"
      });
}

module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
}