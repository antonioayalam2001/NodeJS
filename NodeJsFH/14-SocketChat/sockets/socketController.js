const {Socket: socket} = require('socket.io')
const {validateJWT} = require("../helpers");
const {ChatInfo} = require("../models");
const chatInfo = new ChatInfo()
const socketController = async (socket, io) => {
      // console.log("Cliente conectado", socket.id);
      // console.log(socket)
      //Getting token from Client
      const token = socket.handshake.headers['x-token']
      //Validar que el usuario con JSON Web Token se encuentre activo y este en la base de datos
      const user = await validateJWT(token);
      if (!user) {
            return socket.disconnect();
      }
      console.log("Usuario conectado : ", user.nombre);

      //Add connected user
      chatInfo.connectUser(user);
      //When a user connects say to everyone else
      io.emit('active-users', chatInfo.usersArray)
      //Sending message history to all the new users
      io.emit('receive-messages', chatInfo.last10)

//      Connect socket to a special room
      /*Now the socket is connected to 3 rooms
      * IO
      * Socket
      * user.id
      * */
      socket.join(user.id)
//      Clean array when someone disconnects
      socket.on('disconnect', () => {
            chatInfo.disconnectUser(user.id);
            //Letting know the rest of the users the current state of the users
            io.emit('active-users', chatInfo.usersArray)
      })
      socket.on('send-message', ({uid, msg}) => {
            if (uid) {
                  //            Sending private message
                  socket.to(uid).emit( "private-message" ,{from : user.nombre , msg})
            } else {
                  chatInfo.sendMessage(user.id, user.nombre, msg);
                  //Sending message to all the users
                  io.emit('receive-messages', chatInfo.last10)
            }
      })
}

module.exports = socketController