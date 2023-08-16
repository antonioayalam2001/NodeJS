import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
import { allowCors } from '../middlewares/allowCORS.js'
export const moviesRouter = Router()

// Recuperar todas las peliculas y manejando un filtro por genero
moviesRouter.get('/', MovieController.getAll)
// Recuperar una pelicula por id
moviesRouter.get('/:id', MovieController.getById)
//  Creando una pelicula
moviesRouter.post('/', MovieController.create)
// Actualizando una pelicula, dado que solo queremos actualizar una parte de una pelicula en específico usamos el metodo patch
moviesRouter.patch('/:id', MovieController.update)
// Eliminando una pelicula
moviesRouter.delete('/:id', allowCors, MovieController.delete)
// Ruta especial para el metodo options y se pueda hacer la peticion desde el front con CORS,
// Se esta especificando una ruta en especifico pero podría ser en general
moviesRouter.options('/:id', allowCors, (req, res) => {
  res.status(200).json({ message: 'OK' })
})
