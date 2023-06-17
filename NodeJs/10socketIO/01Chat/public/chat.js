    const formulario = document.querySelector('#chat-form')
    const mensaje = document.querySelector('#message-text')
    const chat = document.querySelector('#chat')
    const wrti= document.querySelector('#writting')
    const userName = document.querySelector('#userName')
    // var io = io.connect("http://localhost:3000")
    var socket = io()
    var username = '';
    formulario.addEventListener('submit', function (e){
        e.preventDefault()

        return false
    })

    function sendMessage(){
        console.log(username)
        addChatMessage({
            username: username,
            message: mensaje.value
        })
        socket.emit( 'new message', mensaje.value)
        mensaje.value = ''
    }


    mensaje.addEventListener('keydown',(e)=>{
        socket.emit('writting')
        wrti.innerHTML = ''
    })

    socket.on('new user', function (newUser){
        alert(newUser.message + 'con el identificador de ' + newUser.username)
    })

    socket.on('bye bye user', function (byeByeUser){
        alert(byeByeUser.message + 'se fue con username : ' + byeByeUser.username)
    })

    socket.on('escribiendo',(escribiendo)=>{
        wrti.innerHTML = '...'
    })

function addParticipantsMessage(data){
    let message = ''
    if (data.numUsers == 1){
        message = ('Theres one participant')
    }else{
        message = (`There are ${data.numUsers} participant`)
    }
}
    function setUsername (){
    username = userName.value.trim()
        console.log(username)
        if (username){
            socket.emit('exists user',username,function (cbValue){
                if (cbValue){
                    mensaje.focus()
                    //Avisando el userName
                    socket.emit('add user', username);
                }else{
                    alert('El userName ya existe')
                    username=username.value = ''

                }
            })
        }
    }

    function addChatMessage (data){
        let li = document.createElement('li')
        li.innerText = `${data.username} : ${data.message}`
        chat.appendChild(li)
    }

    // Socket events

    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
        connected = true;
        // Display the welcome message
        var message = "Welcome to Socket.IO Chat – ";
        alert(message + data.numUsers)
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', function (data) {
        addChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
        addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
            alert('Alguien se fue: ' + data.username)
    });

    // Whenever the server emits 'typing', show the typing message
    // socket.on('typing', function (data) {
    //     addChatTyping(data);
    // });

    // Whenever the server emits 'stop typing', kill the typing message
    // socket.on('stop typing', function (data) {
    //     removeChatTyping(data);
    // });

    document.addEventListener ('keydown',(function (event) {
        // Auto-focus the current input when a key is typed

        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            if (username) {
                sendMessage();
            } else {
                setUsername();
            }
        }
    }))