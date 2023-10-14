// Permite realizar la importación de archivos JSON, esto es porque node no permite la importación de archivos JSON
import 'dotenv/config'
import express, { json } from 'express'
import { corsPackage } from './middlewares/allowCORS.js'
import { createMovieRouter } from './routes/movies.js'
const app = express()
const port = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(json())
// Middleware para habilitar CORS
app.use(corsPackage())

export function createApp ({ movieModel }) {
  app.use('/movies', createMovieRouter({ movieModel }))

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
