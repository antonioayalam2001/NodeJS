const socketController = (socket) => {
            //socket.id -> Unique identifier from the socket, changes every time that you realize a connection
            console.log("socket connected" , socket.id);
            socket.on('disconnect', () => {
                  console.log("Client is gone" , socket.id);
            } )

            socket.on('send-message',(payload,callback)=>{
                  // console.log(payload);
                  const objectFromServer = {
                        id : 1234,
                        date : new Date().getTime()
                  }
                  callback(objectFromServer);
                  //Send to multiple users except the socket self
                  socket.broadcast.emit('send-message',payload)
            })
}

module.exports = {
      socketController
}