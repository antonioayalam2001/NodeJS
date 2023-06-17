var socket = io.connect("http://localhost:3000/",{'force-new':true})
socket.on('hello',(data)=>{
    console.log(data.message)
})