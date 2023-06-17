//HTML
const logOut = document.querySelector('#logOut');
const uidUser = document.querySelector('#uid');
const messageTxt = document.querySelector('#mensaje');
const messagesList = document.querySelector('#mensajes');
const usersList = document.querySelector('#users');

//SOCKETS
let userSocket = null;
let socket = null
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:3000/api/auth/'
    : 'https://projectapinodejstunas.herokuapp.com/api/auth/'

//Validate Token from LocalStorage
const validateJWT = async () => {
      let token = localStorage.getItem('token') || null;
      if (!token || token.length < 10) {
            window.location = "index.html"
            return console.error("No hay ningún token actualmente")
      }
      try {
            const response = await fetch(url, {
                  headers: {
                        "Content-Type": 'application/json',
                        "x-token": token
                  }, method: "GET"
            });
            const {msg, token: tokenDB, usuario} = await response.json();
            //Renovando el Token
            localStorage.setItem("token", tokenDB);
            userSocket = usuario;
            document.title = usuario.nombre;
            await connectSocket();
      } catch (e) {
            window.location = "index.html"
      }
}

const connectSocket = async () => {
      // Info Sockets
      //Options https://socket.io/docs/v4/client-options/
      const socket = io({
            "extraHeaders": {"x-token": localStorage.getItem('token')}
      })

      socket.on('connect', () => {
            console.log("Socket Online")
      })
      socket.on('disconnect', () => {
            console.log("Socket Offline")
      });

      socket.on('receive-messages', (payload) => {
            fillTextMessages(payload)
      });
      socket.on('active-users', (payload) => {
            //payload -> Array of current connected users
            fillUserList(payload)
      });
      socket.on('private-message', (payload) => {
            console.log("Private message" , payload)
      });

      messageTxt.addEventListener('keyup',evt => {
            const uid = uidUser.value;
            if (evt.keyCode === 13){
                  if (messageTxt.value == ''){
                        return messageTxt.focus();
                  }
                  socket.emit('send-message', {uid, msg : messageTxt.value})
                  messageTxt.value = ""
            }
      })

}
const main = async () => {
      await validateJWT();
}

const fillUserList = (users = []) => {
      usersList.innerHTML = " "
      const fragment = document.createDocumentFragment();
      users.forEach(({nombre,uid}) => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            const h5 = document.createElement('h5');
            h5.innerText =  nombre;
            const span = document.createElement('span');
            span.innerText = uid;
            p.appendChild(h5);
            p.appendChild(span);
            li.appendChild(p)
            fragment.appendChild(li);
  })
      usersList.appendChild(fragment)
}

const fillTextMessages = (messages = []) => {
      console.log(messages)
      messagesList.innerHTML = " "
      const fragment = document.createDocumentFragment();
      messages.forEach(({message,uid, name}) => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            const h5 = document.createElement('h5');
            h5.innerText =  name;
            h5.classList.add('userName')
            const span = document.createElement('span');
            span.innerText = message;
            p.appendChild(h5);
            p.appendChild(span);
            li.appendChild(p)
            fragment.appendChild(li);
      })
      messagesList.appendChild(fragment)
}


main();
