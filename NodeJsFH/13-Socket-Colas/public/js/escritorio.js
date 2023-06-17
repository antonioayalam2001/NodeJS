//HMTL References
const desktop = document.querySelector("h1");
const attendNext = document.querySelector("button");
const labelTicket = document.querySelector("small");
const alertDiv = document.querySelector(".alert");
const pendientes = document.querySelector('#lblPendientes');
//Checking if they are really sending a desktop
const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('desktop')) {
      window.location = "index.html"
      throw new Error('Desktop must be provided')
}
const desktopNumber = searchParams.get('desktop');

alertDiv.style.display = "none"

// console.log('Nuevo Ticket HTML');
const socket = io();
socket.on('connect', () => {
      attendNext.disabled = false;
      desktop.innerHTML = `Escritorio : <b> ${desktopNumber} </b>`
});

socket.on('disconnect', () => {
      attendNext.disabled = true;
});

socket.on('last-ticket', (payload) => {

})


attendNext.addEventListener('click', () => {
      socket.emit('attend-ticket', {desktopNumber}, (payload) => {
            if (!payload.ok) {
                  labelTicket.innerText = `No hay mas Tickets por atender`
                  alertDiv.style.display = '';
                  return alertDiv.innerText = payload.msg;
            }
            labelTicket.innerText = `Ticket Numero ${payload.ticket.number}`
      })
});

socket.on('cola', payload => {
      pendientes.innerHTML = payload;
      console.log(payload)
})
socket.on('current-attended', (ticket) => {
      if (ticket) {
            labelTicket.innerText = `Ticket Numero ${ticket.number}`
            alertDiv.style.display = 'none';
      }
})