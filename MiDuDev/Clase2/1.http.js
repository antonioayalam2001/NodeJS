const http = require('node:http')
const fs = require('node:fs/promises')
const DESIRED_PORT = process.env.PORT || 3000

const processRequest = (req, res) => {
  // Hay 2 peticiones 1 para el favicon y otra para el contenido
  console.log(req.url)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('<h1>Página /</h1>')
  } else if (req.url === '/adios') {
    res.end('<h1>Pagina /adios</h1>')
  } else if (req.url === '/contact') {
    res.end('<h1>Página de contacto</h1>')
  } else if (req.url === '/imagen') {
    res.setHeader('Content-Type', 'image/png')
    fs.readFile('./img/img1.png').then((data) => {
      res.end(data)
    }).catch(() => {
      res.statusCode = 500 // Internal Server Error
      res.end('<h1>500 Internal Server Error</h1>')
    })
  } else {
    res.statusCode = 404 // Not Found
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>404 Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(DESIRED_PORT, () => {
  console.log(`Servidor escuchando en puerto ${DESIRED_PORT}`)
})
