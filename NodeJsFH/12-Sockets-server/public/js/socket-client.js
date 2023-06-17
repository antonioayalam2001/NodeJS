const status = document.querySelector('#status');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');
// Sending connection
const socket = io();

socket.on('connect', () => {
      console.log("Conectado")
      status.style.color = 'green';
      status.innerHTML = '<b>Online</b>'
});

socket.on('disconnect', () => {
      console.log("Desconectado del Servidor")
      status.style.color = 'red';
      status.innerHTML = 'Offline'
});

btnSend.addEventListener('click', () => {

      const payload = {
            msg: txtMessage.value,
            id: socket.id ,
            date : new Date().getTime(),
            dateString : new Date(new Date().getTime())
      }

      socket.emit('send-message', payload , (objectFromServer)=> {
            console.log('Desde el server', objectFromServer.id);
            console.log('Desde el server', new Date(objectFromServer.date));
      });
})

socket.on('send-message',payload => {
      console.log(payload)
})