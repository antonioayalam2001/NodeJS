import express from 'express'
import chat from '../routes/chat.js'
import morgan from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
const PORT = process.env.PORT || 3000
const app = express()
const server = createServer(app)
// En caso de que se pierda la conexión, se intentará reconectar durante 2 segundos.
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 30000 // 30 segundos
  }
})
const routes = {
  chat: '/chat'
}
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(routes.chat, chat)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    //   Es un mensaje de tipo Broadcast, es decir, se envía a todos los clientes conectados excepto al que lo envió.
    socket.broadcast.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

export const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}
