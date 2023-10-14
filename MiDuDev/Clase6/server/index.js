import express from 'express'
import chat from '../routes/chat.js'
import morgan from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client/.'
const PORT = process.env.PORT || 3000
const app = express()
const server = createServer(app)
dotenv.config()
// En caso de que se pierda la conexión, se intentará reconectar durante 2 segundos.
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 30000 // 30 segundos
  }
})
const routes = {
  chat: '/chat'
}

const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
})

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`)

await db.execute(`
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`)

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
