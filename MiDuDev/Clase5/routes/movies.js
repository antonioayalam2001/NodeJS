import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
import { allowCors } from '../middlewares/allowCORS.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })
  // Recuperar todas las peliculas y manejando un filtro por genero
  moviesRouter.get('/', movieController.getAll)
  // Recuperar una pelicula por id
  moviesRouter.get('/:id', movieController.getById)
  //  Creando una pelicula
  moviesRouter.post('/', movieController.create)
  // Actualizando una pelicula, dado que solo queremos actualizar una parte de una pelicula en específico usamos el metodo patch
  moviesRouter.patch('/:id', movieController.update)
  // Eliminando una pelicula
  moviesRouter.delete('/:id', allowCors, movieController.delete)
  // Ruta especial para el metodo options y se pueda hacer la peticion desde el front con CORS,
  // Se esta especificando una ruta en especifico pero podría ser en general
  moviesRouter.options('/:id', allowCors, (req, res) => {
    res.status(200).json({ message: 'OK' })
  })

  return moviesRouter
}
