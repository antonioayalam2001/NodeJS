const socket = io()
window.playVideo = (function (cb){
    return window.requestAnimationFrame ||
        function (cb) {
            window.setTimeout(cb, 1000/100)
        }
})()


function  streamVideo(context,canvas,video,startCamera)
{
    //Convirtiendo todas las capturas recibidas para poder animarlas dentro del canvas
    let outputStream = canvas.toDataURL('image/jpeg',.5)
    //De donde, posicion en X y Y
    context.drawImage(video,0,0)
    socket.emit('streaming',outputStream)
    //Funcion recursiva para poder crear la animación en el canvas
    playVideo(function () {
        streamVideo(context,canvas,video,startCamera)
    })
}


window.addEventListener('DOMContentLoaded',e=>{
    //Creating a new attribute into the navigator object
    // Prefer camera resolution nearest to 1280x720.
    const constraints = { audio: true, video: true };

    let startCamera = false,
        video = document.querySelector('#video'),
        canvas = document.querySelector('#canvas'),
        context = canvas.getContext('2d')

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
            video.srcObject = mediaStream;
            video.play();
            video.style.display = 'none'
            startCamera=true
            streamVideo(context,canvas,video,startCamera)

                //Desactivando para poder mandarlo al canvas

        })
        .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
})
