module.exports =   (io) => {

      let line_history = []

      io.on('connection', (socket)=>{
            console.log('New User')

            if (line_history.length != 0){
                  for (const lineHistoryKey in line_history) {
                        io.emit('draw-line', {line : line_history[lineHistoryKey]})
                  }
            }
            socket.on('draw-line',(data)=>{
                  //Almacenamos para que los usuarios nuevos puedan visualizar lo que se ha hecho—
                  line_history.push(data.line)

                  io.emit('draw-line',data)
            })

            socket.on('disconnect',()=>{
                  line_history = []
            })
      })
}