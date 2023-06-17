const {request: req, response: res} = require('express');
const Usuario = require('../models/user')
const bcrypt = require('bcrypt');
const {JsonWebTokenGenerator} = require("../helpers/jsonWebTokenGenerator");
const {googleVerify} = require("../helpers/googleVerify");
const path = require('path');

const usuarioRegister = (req,res) =>{
      res.sendFile(path.join(__dirname, '/../public/register.html'))
}

const loginPost = async (req, res) => {
      const {email, password} = req.body
      try {
            //verificar si email existe
            const usuario = await Usuario.findOne({email});
            // console.log(usuario)
            if (!usuario) {
                  return res.status(400).json({
                        msg: "Usuario / Password incorrecto --> EMAIL",
                  })
            }
            //Verificar si usuario se encuentra activo
            if (!usuario.state) {
                  return res.status(400).json({
                        msg: "Eliminado -- state : false",
                  })
            }
            //Verificar contraseña
            const validPassword = bcrypt.compareSync(password, usuario.password)
            if (!validPassword) {
                  return res.status(400).json({
                        msg: "Usuario / Password incorrecto --> PASSWORD",
                  });
            }
            //Generar JSON Web Token
            const token = await JsonWebTokenGenerator(usuario._id);
            // console.log(usuario)
            //Retirando el id del usuario dado que ya contamos con el en el JWT
            res.setHeader("cookie", token);
            res.cookie('token', token);
            // console.log(req.session)
            //Agregando información a nuestra session
            req.session.token = token;
            req.session.usuario = usuario;

            res.json({
                  msg: "Login success",
                  usuario,
                  token
            });
      } catch (e) {
            return res.status(500).json({
                  msg: 'Something went wrong'
            });
      }
}

const googleSign = async (req, res) => {
      const {token : googleToken} = req.body;
      //Recuperando información del token
      try {
            const {nombre, img, email} = await googleVerify(googleToken);
            // console.log(googleUser);
            let usuario = await Usuario.findOne({email});
            if (!usuario) {
                  const data = {
                        nombre,
                        email,
                        password: 'noImportaria',
                        img,
                        google: true,
                  }
                  usuario = new Usuario(data);
                  await usuario.save();
            } else {
                  console.log(`USUARIO ENCONTRADO EN LA BASE DE DATOS ACTUALIZANDO INFORMACIÓN : con los datos 
                        ${nombre}
                        ${img}
                        ${email}
                  `)
                  if (!usuario.state){
                        //401 -> No autorizado
                        return res.status(401).json({
                              msg : 'Hable con el administrador para hacer revisión de su estado en la aplicación'
                        })
                  }
                  usuario = await Usuario.findOneAndUpdate({email}, {nombre, img, email, google: false});
                  console.log('Usuario actualizado')
                  console.log(usuario)
            }

            const token = await JsonWebTokenGenerator(usuario._id);
            // console.log(token)
            // console.log(usuario)
            req.session.token = token;
            req.session.usuario = usuario;

            res.json({
                  msg: "Todo correcto, Google Sign in complete",
                  token,
                  user : usuario
            })

      } catch (e) {
            res.status(400).json({
                  msg: "Algo salio mal al consultar la autenticación con Google"
            })
      }
}

module.exports = {
      loginPost,
      googleSign,
      usuarioRegister
}