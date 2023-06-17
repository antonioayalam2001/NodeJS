//Solo se encarga de mandar a ejecutar peticion y generar vistas
// Se comunica con el controlador
const express = require('express'), MovieController = require("../controller/movie-controller"), router = express.Router()

//COOKIES
//Para acceder a las cookies se debe de instalar el middleware
//cookieParser()
//https://www.npmjs.com/package/cookie-parser

function error404(req, res, next) {

}

//Este archivo solo deberia contener la rura y la funcion de ejecucion que realiza
router
    .get('/', MovieController.getAll)
    .get('/agregar', MovieController.addForm)
    .post('/', MovieController.save)
    .get('/editar', MovieController.getOne)
    // .post('/actualizar/:movieId',MovieController.update)
    // .get('/eliminar',MovieController.delete)
    //Antes de crear al metodo .save
    // .put('/actualizar/:movieId',MovieController.update)
    .put('/actualizar/:movieId', MovieController.save)
    .delete('/eliminar', MovieController.delete)
    .use(MovieController.error404);

module.exports = router


//RECUPERANDO PARAMETROS

//link : href=`/editar/?title=${movie.title}&hola=hihihi`
// Metodo:          console.log(req.query)
//                        console.log(req.query.title)
//                        console.log(req.query.hola)
//
// link : href=/editar/${movie.title}`
// Metodo :     .get('/editar/:titulo', (req,res,next)=>{
//          console.log(req.params.titulo)
//     })
//link :      /editar/${movie.title}/hola
//Metodo:     .get('/editar/:titulo/:valor', (req,res,next)=>{
//          console.log(req.params.titulo)
//          console.log(req.params.valor)

