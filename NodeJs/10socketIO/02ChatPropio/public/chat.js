    const formulario = document.querySelector('#chat-form')
    const mensaje = document.querySelector('#message-text')
    const chat = document.querySelector('#chat')
    const wrti= document.querySelector('#writting')
    // var io = io.connect("http://localhost:3000")
    var io = io()

    formulario.addEventListener('submit', function (e){
        e.preventDefault()
        io.emit( 'new message', mensaje.value)
        mensaje.value = ''
        return false
    })

    mensaje.addEventListener('keydown',(e)=>{
        io.emit('writting')
    })

    io.on('user says', function (userSays){
        let li = document.createElement('li')
        li.innerText = (userSays)
        chat.appendChild(li)
    })

    io.on('new user', function (newUser){
        alert(newUser.message)
    })

    io.on('bye bye user', function (byeByeUser){
        alert(byeByeUser.message)
    })

    io.on('escribiendo',(escribiendo)=>{
        wrti.innerHTML = '...'
    })
