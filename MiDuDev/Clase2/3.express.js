const express = require('express')
const fs = require('fs/promises')
const DESIRED_PORT = process.env.PORT || 3000
const app = express()
const dittoJSON = require('./clase2.pokemon/ditto.json')
// app.use(express.json())

app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.method !== 'POST') {
    return next()
  }
  if (req.headers['content-type'] !== 'application/json') {
    return next()
  }
  // Aquí solo llegan peticiones POST con Content-Type: application/json
  let body = ''
  // Conforme llega la información se va concatenando en body, lo hacemos mediante el escucha de eventos
  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  // Cuando termina de llegar la información se ejecuta el evento end
  req.on('end', () => {
    const data = JSON.parse(body)
    data.middleware = 'Modificado en middleware'
    req.body = { ...data }
    next()
  })
})

app.get('/pokemon/ditto', (req, res) => {
  return res.status(201).json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
  console.log(req.body)
  return res.status(201).json({ message: 'Pokemon creado', ...req.body })
})

// Ruta por defecto, todas aquellas acciones que no se encuentren definidas en las rutas anteriores
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(DESIRED_PORT, () => {
  console.log(`Servidor escuchando en puerto ${DESIRED_PORT}`)
})
