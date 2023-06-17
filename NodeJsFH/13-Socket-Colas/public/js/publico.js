//HMTL References
// const label = document.querySelector("#lblNuevoTicket");
// const buttonCreate = document.querySelector("button");
const lblEscritorio1 = document.querySelector("#lblEscritorio1")
const lblEscritorio2 = document.querySelector("#lblEscritorio2")
const lblEscritorio3 = document.querySelector("#lblEscritorio3")
const lblEscritorio4 = document.querySelector("#lblEscritorio4")
const labelTicket1 = document.querySelector("#lblTicket1")
const labelTicket2 = document.querySelector("#lblTicket2")
const labelTicket3 = document.querySelector("#lblTicket3")
const labelTicket4 = document.querySelector("#lblTicket4")

const socket = io();
socket.on('current-state', (payload) => {
      //Last 4 tickets
      const audio = new Audio("./audio/new-ticket.mp3")
      audio.play();
      const [ticket1, ticket2, ticket3, ticket4] = payload
      if (ticket1) {
            lblEscritorio1.innerText = ticket1.desktop
            labelTicket1.innerText = `Ticket : ${ticket1.number}`
      }
      if (ticket2) {
            lblEscritorio2.innerText = ticket2.desktop
            labelTicket2.innerText = `Ticket : ${ticket2.number}`
      }
      if (ticket3) {
            lblEscritorio3.innerText = ticket3.desktop
            labelTicket3.innerText = `Ticket : ${ticket3.number}`
      }
      if (ticket4) {
            lblEscritorio4.innerText = ticket4.desktop
            labelTicket4.innerText = `Ticket : ${ticket4.number}`
      }
})
