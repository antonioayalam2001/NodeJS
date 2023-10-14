import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import chat from '../routes/chat.js'
const PORT = process.env.PORT || 3000
const app = express()
const server = createServer(app)
dotenv.config()
const io = new Server(server, {
  // En caso de que se pierda la conexión, se intentará reconectar durante 2 segundos.
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
    id iNTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    username TEXT
  )
`)

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(routes.chat, chat)

io.on('connection', async (socket) => {
  console.log('A user has logged in ')
  console.log('Informacion del socket de cliente')
  /* Esta infromación es declarada en el lado del cliete
      const socket = io({
          auth : {
              token: "123",
              serverOffset : 0,
              username : "...
          }
      });
  */
  // console.log(socket.handshake)
  const username = socket.handshake.auth.username ?? 'Anonimo'

  socket.on('chat message', async (msg) => {
    // Insertando mensaje en la base de datos
    let result
    console.log('message: ' + msg)
    console.log('username: ' + username)
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content, username)  VALUES (:msg, :username)', // El signo de interrogación es un placeholder
        args: {
          msg, username
        }
      })
      //   Es un mensaje de tipo Broadcast, es decir, se envía a todos los clientes conectados excepto al que lo envió.
      socket.broadcast.emit('chat message', msg, result.lastInsertRowid.toString(), username)
    } catch (error) {
      console.log(error)
      console.error('something went wrong :(')
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  // Detectando si se ha recuperado de una desconexion
  if (!socket.recovered) {
    console.log('Hello from the other')
    try {
      const results = await db.execute({
        sql: 'SELECT id, content , username from messages where id > :id',
        args: {
          id: socket.handshake.auth.serverOffset ?? 0
        }
      })
      console.log(results)
      results.rows.forEach(row => {
        console.log(row)
        socket.emit('chat message', row.content, row.id.toString(), row.username)
      })
    } catch (error) {
      console.log(error)
    }
  }
})

export const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}
