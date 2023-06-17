'use strict'
//This variable has the module of the model
let MovieModel = require('../models/movie-model'),
    MovieController = () => {
    }
// Decide que es lo que necesita la vista y el modelo
//    This one takes charge of getting all the comunication between views  with the model
//    The controller must have the same methods as the model
MovieController.getAll = (req, res, next) => {
    MovieModel.getAll((docs) => {
        let locals = {
            data: docs,
            title: 'Movies'
        }
        res.render('main', locals);
    })
}
MovieController.insert = (req, res, next) => {
    let dataToAdd = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        release_year: req.body.release_year,
        rating: req.body.rating,
        image: req.body.image
    }
    MovieModel.insert(dataToAdd, (error, rows) => {
        if (error) {
            let locals = {
                title: `Error al insertar el elemento con id ${dataToAdd.movie_id}`,
                desc: `${error.sqlMessage}`
            }
            res.render('error', locals)
        } else {
            res.redirect('/')
        }
    })
}
MovieController.getOne = (req, res, next) => {
    let movieId = req.query.movie_id
    console.log(movieId)
    MovieModel.getOne(movieId, (data) => {
            let locals = {
                title: 'Editar Pelicula',
                data: data
            }
            res.render('add-movie', locals)
        }
    )
}
MovieController.update = (req, res, next) => {
    let movieId = req.params.movieId
    let data = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        release_year: req.body.release_year,
        rating: req.body.rating,
        image: req.body.image
    }
    MovieModel.update(data,(error,rows)=>{
        if (error) {
            let locals = {
                title: `Error al actualizar el elemento con id ${data.movie_id}`,
                desc: `${error.sqlMessage}`
            }
            res.render('error', locals)
        } else {
            res.redirect('/')
        }
    })
}
MovieController.delete = (req, res, next) => {
    // let element
    // MovieModel.getOne(req.query.movie_id,(error,info)=>{
    //     if(info)element = info
    // })
    MovieModel.delete(req.query.movie_id,()=>{
        res.redirect('/')
    })
}

MovieController.save = (req, res, next) => {

    console.log("El id de la movie"+ req.params.movieId)
    console.log("El otro Param "+ req.params.otroParam)
    let data = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        release_year: req.body.release_year,
        rating: req.body.rating,
        image: req.body.image
    }
    MovieModel.save(data,()=>{
            res.redirect('/')
    })
}

//Solicitando vista de formulario
MovieController.addForm = (req, res, next) => {
    res.render('add-movie', {
        title: "Agregar"
    })
}
MovieController.error404 = (req, res, next) => {
    let error = new Error();
    let locals = {
        title: 'Error 404',
        desc: 'Página no encontrada',
        error: error.stack
    }
    error.status = 404;
    res.render('error', locals);
}

module.exports = MovieController