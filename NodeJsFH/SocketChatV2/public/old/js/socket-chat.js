var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('name') || !params.has("room")) {
      window.location = 'index.html'
}
if (params.get("name")==="" || params.get("room") ===""){
      window.location = 'index.html'
      console.log("hola")
}

// document.title = params.get('name')
let user = {
      name: params.get('name'),
      room : params.get("room")
}

socket.on('connect', function () {
      // console.log('Conectado al servidor');
      //Letting the server know someone get into the chat
      socket.emit("loginChat", user, callback => {
            renderUsers(callback)
      })
});

//Listening to all the persons who are in the chat
socket.on("currentusers", (payload) => {
      // console.log(payload);
})

// escuchar
socket.on('disconnect', function () {
      console.log('Perdimos conexión con el servidor');
});

socket.on("sendmessage", ({user, msg, date}) => {
      let payload = {user, msg, date};
      console.log(payload);
})
socket.on("alertdisconnect", ({user, msg, date}) => {
      let payload = {user, msg, date};
      console.log(payload);
})

//      Private Messages
socket.on("privatemessage", (message) => {
      console.log("PrivateMessage : ", message)
})

