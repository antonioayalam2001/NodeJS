const express = require('express'),
    dbConMov = require('../models/movies.js'),
    router = express.Router()

// // OPCION DE CONEXION 2
// const connection = require('../models/movies')

//COOKIES
//Para acceder a las cookies se debe de instalar el middleware
//cookieParser()
//https://www.npmjs.com/package/cookie-parser

function error404 (req,res,next){
    let error = new Error();
    let locals = {
        title: 'Error 404',
        desc: 'Página no encontrada',
        error: error.stack
    }
    error.status = 404;
    res.render('error', locals);
}
router
    .use(dbConMov)
router
    .get('/',(req,res)=>{
    req.getConnection((err,dbConMov)=>{
            if (err) next(new Error('No hay registros que mostrar'))
        dbConMov.query('SELECT * FROM movie',(err,movies)=>{
            if(err){
                console.log(err);
                return;
            }
            res.render('main',{
                title: 'Movies',
                data: movies
            });
        }
        );
    })
})
    .get('/agregar',(req,res,next)=>{
        res.render('add-movie',{
            title: "Agregar"
        })
})
    .post('/',(req,res,next)=>{
        req.getConnection((err,dbConMov)=>{
            if (err) next(new Error('No se pudo realizar la insercion'))
            let dataToAdd = {
                movie_id : req.body.movie_id,
                title : req.body.title,
                release_year : req.body.release_year,
                rating : req.body.rating,
                image : req.body.image
            }
             console.log(dataToAdd)
            // ? -> Se reemplaza por el objeto que creamos de dataToAdd
            dbConMov.query('insert into movie set ?',dataToAdd,(error,rows)=>{
                console.log(error)
                return error ? res.redirect('/agregar') : res.redirect('/')
            })
        })
    })
    .get('/editar', (req,res,next)=>{
         let movieId = req.query.movie_id
         console.log(req.query.year)
        req.getConnection((err,dbConMov)=>{
            dbConMov.query('select * from movie where movie_id = ? ',movieId,(err,rows)=>{
                if (err){
                    req.redirect
                }else{
                    let locals = {
                        title: 'Editar Pelicula',
                        data: rows
                    }
                    res.render('add-movie',locals)
                }
            })
        })
    })
    .post('/actualizar/:movieId',(req,res,next)=>{
        let movieId = req.params.movieId
        req.getConnection((err,dbConMov)=>{
            let dataToAdd = {
                movie_id : req.body.movie_id,
                title : req.body.title,
                release_year : req.body.release_year,
                rating : req.body.rating,
                image : req.body.image
            }
            console.log(dataToAdd)
            // ? -> Se reemplaza por el objeto que creamos de dataToAdd
            dbConMov.query('update movie set ? where movie_id = ?',[dataToAdd,movieId],(error,rows)=>{
                console.log(error?error:rows)
                return error ? res.redirect('/agregar') : res.redirect('/')
            })
        })
    })
    .get('/eliminar',(req,res,next)=>{
        let movieId = req.query.movie_id
        req.getConnection((err,dbConMov)=>{
            let dataToAdd = {
                movie_id : req.body.movie_id,
                title : req.body.title,
                release_year : req.body.release_year,
                rating : req.body.rating,
                image : req.body.image
            }
            console.log(dataToAdd)
            // ? -> Se reemplaza por el objeto que creamos de dataToAdd
            dbConMov.query('delete from movie  where movie_id = ?',movieId,(error,rows)=>{
                console.log(error?error:rows)
                return error ? next(new Error('Registro no encontrado')) : res.redirect('/')
            })
        })
    })
    .use(error404);

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

