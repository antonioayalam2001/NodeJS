import { validatePartialMovie } from '../schemas/movie.js'
import { readJSON } from '../util/utils.js'
import { randomUUID } from 'node:crypto'
const MOVIES = readJSON('../movies.json')
export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return MOVIES.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
    }
    return MOVIES
  }

  static async getOne (id) {
    return MOVIES.find((movie) => movie.id === id)
  }

  static async create ({ movie }) {
    const newMovie = {
      id: randomUUID(), // Puede que sea la base de datos quien cree este ID
      ...movie
    }
    MOVIES.push(newMovie)
    return newMovie
  }

  static async update ({ id, movie }) {
    const movieIndex = MOVIES.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
      return null
    }
    const movieToUpdate = MOVIES[movieIndex]
    const partialMovie = validatePartialMovie(movie)
    if (!partialMovie.success) {
      return (JSON.parse(partialMovie.error.message))
    }
    const updatedMovie = {
      ...movieToUpdate,
      ...partialMovie.data
    }
    MOVIES[movieIndex] = updatedMovie
    return updatedMovie
  }

  static async delete ({ id }) {
    const movieIndex = MOVIES.findIndex(movie => movie.id === id)
    const deletedMovie = MOVIES[movieIndex]
    if (movieIndex === -1) {
      return null
    }
    MOVIES.splice(movieIndex, 1)
    // console.log(deletedMovie)
    return deletedMovie
  }
}
