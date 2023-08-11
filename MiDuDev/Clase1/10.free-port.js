// Conexiones con TCP (net) y HTTP (http)
// El protocolo TCP es un protocolo orientado a conexión, lo que significa que antes de enviar datos, el cliente y el servidor deben establecer una conexión.
// El protocolo HTTP es un protocolo sin estado, lo que significa que cada solicitud HTTP contiene toda la información necesaria para ejecutarla, sin necesidad de mantener información de estado entre llamadas.
const net = require('node:net')
function findAvailablePort (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then((port) => { resolve(port) })
      }
      reject(err)
    })
    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
  })
}

module.exports = { findAvailablePort }
