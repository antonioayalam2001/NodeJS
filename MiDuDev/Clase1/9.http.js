const http = require('node:http')
const { findAvailablePort } = require('./10.FREE-PORT.JS')
const server = http.createServer((req, res) => {
  res.end('Hola mundo')
})

findAvailablePort(3000).then((port) => {
  console.log('Puerto disponible ' + port)
  server.listen(port, () => {
    console.log('Servidor escuchando en puerto ' + port)
  })
})
