//HMTL References
const label = document.querySelector("#lblNuevoTicket");
const buttonCreate = document.querySelector("button");

// console.log('Nuevo Ticket HTML');
const socket = io();


socket.on('connect', () => {
      // console.log('Conectado');

      buttonCreate.disabled = false;
      // lblOnline.style.display  = '';

});

socket.on('disconnect', () => {
      // console.log('Desconectado del servidor');
      buttonCreate.disabled = true;

});


socket.on('last-ticket', (payload) => {
      label.innerHTML = payload;
})


buttonCreate.addEventListener( 'click', () => {
      socket.emit( 'next-ticket', null, ( ticket ) => {
            label.innerHTML = ticket;
            console.log('Desde el server', ticket );
      });

});
