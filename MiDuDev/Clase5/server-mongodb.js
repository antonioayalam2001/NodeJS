import { createApp } from './app.js'
import { MovieModel } from './models/mongo/movie.js'

createApp({ movieModel: MovieModel })
