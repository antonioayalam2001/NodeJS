var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET users listing. */
// Este se vuelve el home del contexto principal de cual venimos, el cual se trata de / users
// Este archivo se encuentra en app.js
// app.use("/users", usersRouter);


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

  // Aqui ya estaríamos creando una ruta para el usuario que quiere registrarse por ejemplo 
  .get('/usuarioOtro', function (req, res, next) { 
      res.render("index", { title: "Ahora vengo desde UsuarioOtro" });

  })

module.exports = router;
