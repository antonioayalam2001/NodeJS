import { MovieModel } from '../models/movie.js'
import { validateMovie } from '../schemas/movie.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const filteredMovies = await MovieModel.getAll({ genre })
    if (!filteredMovies.length) {
      return res.status(404).json({ message: 'Not found movies with the specified genera' })
    }
    return res.status(200).json({ data: filteredMovies })
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getOne(id)
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' })
    }
    res.status(200).json({ data: movie })
  }

  static async create (req, res) {
    const reslut = validateMovie(req.body)
    if (!reslut.success) {
      return res.status(400).json(JSON.parse(reslut.error.message))
    }
    const newMovie = await MovieModel.create({ movie: reslut.data })
    return res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, movie: req.body })
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.status(200).json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deletedMovie = await MovieModel.delete({ id })
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.status(200).json(deletedMovie)
  }
}
