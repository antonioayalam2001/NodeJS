const TicketControl = require("../models/ticket-control");
const TicketC = new TicketControl();
const socketController = (socket, io) => {
      // console.log('Cliente conectado', socket.id);

      socket.emit("last-ticket", `Ticket ${TicketC.ultimo}`)
      socket.emit("current-state", TicketC.lastFour)
      io.emit('cola', TicketC.tickets.length)

      socket.on('next-ticket', (payload, callback) => {
            const next = TicketC.next();
            // Callback shows whats the ticket that it must display
            callback(next);
            socket.broadcast.emit('last-ticket', `Ticket ${TicketC.ultimo}`);
            socket.broadcast.emit('cola', TicketC.tickets.length)
      })

      socket.on('attend-ticket', ({desktopNumber}, callback) => {
            if (!desktopNumber) {
                  return callback({
                        ok: false,
                        msg: 'Desktop must be provided'
                  })
            }
            const ticket = TicketC.attendTicket(desktopNumber);
            //Update change in last 4
            socket.broadcast.emit("current-state", TicketC.lastFour)
            socket.broadcast.emit('cola', TicketC.tickets.length)
            socket.emit('cola', TicketC.tickets.length)
            // io.broadcast.emit('current-attended',ticket);
            io.emit('current-attended', ticket);

            if (!ticket) {
                  callback({
                        ok: false,
                        msg: "There are no more tickets"
                  })
            } else {
                  callback({
                        ok: true,
                        ticket
                  })
            }
      })

      socket.on('disconnect', () => {
      });
}

module.exports = {
      socketController
}

