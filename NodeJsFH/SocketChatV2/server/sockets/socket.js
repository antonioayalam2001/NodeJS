// const {Socket : socket} = require('../server');
const {Usuarios} = require("../Classes/Usuarios");
const {createMessages} = require("../utils/utilities");
const users = new Usuarios();
const socketController = (io, socket) => {

      socket.on('loginChat', (payload, callback) => {
            let {name, room} = payload
            room = room.toLowerCase();
            if (!name) {
                  return callback({
                        msg: "Name must be provided"
                  })
            }
            users.addPerson(socket.id, name, room);
            socket.join(room)
            //Sending current users connected
            callback(users.getPersonsPerRoom(room));
            socket.broadcast.to(room).emit("currentusers", users.getPersonsPerRoom(room));
            socket.broadcast.to(room).emit("sendmessage", createMessages("Admin", `User has join the room ${name}`))
      })

      socket.on('disconnect', () => {
            const user = users.removeDisconnected(socket.id)
            socket.broadcast.to(user.room).emit("sendmessage", createMessages("Admin", `User has left the room ${user.name}`))
            //Sending current users connected
            socket.broadcast.to(user.room).emit("currentusers", users.getPersonsPerRoom(user.room))
      });

      socket.on("sendmessage", (payload,callback) => {
            let usuario = users.getOnePerson(socket.id);
            let message = createMessages(usuario.name, payload.msg);
            socket.broadcast.to(usuario.room.toLowerCase()).emit("sendmessage", message);
            callback(message);
      })

//      Private Messages
      socket.on("privatemessage", (data) => {
            if (!data.private) {
                  let person = users.getOnePerson(socket.id);
                  socket.broadcast.emit("privatemessage", createMessages(socket.id, data.msg));
            }
            socket.to(data.private).emit("privatemessage", createMessages(socket.id, data.msg))
      })
//      Rooms
}

module.exports = {
      socketController
}