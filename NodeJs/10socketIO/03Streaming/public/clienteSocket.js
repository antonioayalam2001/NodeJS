(function  () {
    const socket = io()
    socket.on('play stream', function (image) {
        document.querySelector('#streaming').src = image
    })
    //Creating a new attribute into the navigator object
    // Prefer camera resolution nearest to 1280x720.
})()
