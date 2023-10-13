import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const filteredMovies = await this.movieModel.getAll({ genre })
    if (!filteredMovies.length) {
      return res.status(404).json({ message: 'Not found movies with the specified genera' })
    }
    return res.status(200).json({ data: filteredMovies })
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getOne(id)
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' })
    }
    res.status(200).json({ data: movie })
  }

  create = async (req, res) => {
    const reslut = validateMovie(req.body)
    console.log(reslut)
    if (!reslut.success) {
      return res.status(400).json(JSON.parse(reslut.error.message))
    }
    const newMovie = await this.movieModel.create({ movie: reslut.data })
    return res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message))
    }

    const updatedMovie = await this.movieModel.update({ id, movie: result.data })
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.status(200).json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const deletedMovie = await this.movieModel.delete({ id })
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.status(200).json(deletedMovie)
  }
}
