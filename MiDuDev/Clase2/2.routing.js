const http = require('node:http')
const dittoJSON = require('./clase2.pokemon/ditto.json')
const DESIRED_PORT = process.env.PORT || 3000

function processRequest (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
        {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200 // OK
          return res.end(JSON.stringify(dittoJSON))
        }
        case '/':
        {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.statusCode = 200 // OK
          return res.end('<h1>Página /</h1>')
        }
        default:
        {
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not Found</h1>')
        }
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // Conforme llega la información se va concatenando en body, lo hacemos mediante el escucha de eventos
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          // Cuando termina de llegar la información se ejecuta el evento end
          req.on('end', () => {
            console.log(JSON.parse(body))
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify({ message: 'Pokemon creado', data: JSON.parse(body) }))
          })
          break
        }
        default: {
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not Found</h1>')
        }
      }
  }
  if (req.url === '/') {
    res.end('<h1>Página /</h1>')
  }
}

const server = http.createServer(processRequest)
server.listen(DESIRED_PORT, () => {
  console.log(`Servidor escuchando en puerto ${DESIRED_PORT}`)
})
