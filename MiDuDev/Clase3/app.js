const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const crypto = require('node:crypto')
const MOVIES = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movie')
const cors = require('cors')

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:5500'
]
// Middleware para habilitar CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

const allowCors = (req, res, next) => {
  const origin = req.header('origin')
  if (!ACCEPTED_ORIGINS.includes(origin) || !origin) {
    return res.status(403).json({ message: 'Forbidden' })
  }
  res.header('Access-Control-Allow-Origin', origin)
  // Indicando que metodos estan permitidos
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next()
}

app.disable('x-powered-by')
app.use(express.json())
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Home Page' })
})
// Recuperar todas las peliculas y manejando un filtro por genero
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = MOVIES.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
    if (!filteredMovies.length) {
      return res.status(404).json({ message: 'Not found movies with the specified genera' })
    }
    return res.status(200).json({ data: filteredMovies })
  }
  res.status(200).json(MOVIES)
})
// Recuperar una pelicula por id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = MOVIES.find(movie => movie.id === id)
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' })
  }
  res.status(200).json({ data: movie })
})
app.post('/movies', (req, res) => {
  const reslut = validateMovie(req.body)
  if (!reslut.success) {
    return res.status(400).json(JSON.parse(reslut.error.message))
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...reslut.data
  }
  MOVIES.push(newMovie)
  return res.status(201).json(newMovie)
})
// Actualizando una pelicula, dado que solo queremos actualizar una parte de una pelicula en específico usamos el metodo patch
app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = MOVIES.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  const movie = MOVIES[movieIndex]
  const partialMovie = validatePartialMovie(req.body)
  if (!partialMovie.success) {
    return res.status(400).json(JSON.parse(partialMovie.error.message))
  }
  const updatedMovie = {
    ...movie,
    ...partialMovie.data
  }
  MOVIES[movieIndex] = updatedMovie
  return res.status(200).json(updatedMovie)
})
// Eliminando una pelicula
app.delete('/movies/:id', allowCors, (req, res) => {
  const { id } = req.params
  const movieIndex = MOVIES.findIndex(movie => movie.id === id)
  const deletedMovie = MOVIES[movieIndex]
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  MOVIES.splice(movieIndex, 1)
  console.log(deletedMovie)
  return res.status(200).json(deletedMovie)
})

// Ruta especial para el metodo options y se pueda hacer la peticion desde el front con CORS,
// Se esta especificando una ruta en especifico pero podría ser en general
app.options('/movies/:id', allowCors, (req, res) => {
  res.status(200).json({ message: 'OK' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
