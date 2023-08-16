// Permite realizar la importación de archivos JSON, esto es porque node no permite la importación de archivos JSON
import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsPackage } from './middlewares/allowCORS.js'
const app = express()
const port = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(json())
// Middleware para habilitar CORS
app.use(corsPackage())

app.use('/movies', moviesRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
