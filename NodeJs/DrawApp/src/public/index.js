'use strict'
const d = document;
const canvas = d.getElementById('canvas');
const socket = io()
const init = () => {
//    Eventos que capturamos del usuario

//    OBJETO MOUSE
    let mouse = {
        click : false,
        move : false,
        pos :   {   x:  0,    y:  0   },
        pos__prev : false
    }

//    CANVAS
    const context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width
    canvas.height = height

    canvas.addEventListener('mousedown',   (e)=>{
      mouse.click = true;

    })
    canvas.addEventListener('mouseup',   (e)=>{
      mouse.click = false;

    })

    canvas.addEventListener('mousemove' ,   (ev)=>{
        console.log(ev)
      mouse.pos.x = ev.clientX / width;
      mouse.pos.y = ev.clientY / height;
      mouse.move = true;
        console.log(mouse)

    })

    socket.on('draw-line' , (data)  =>{
        const line = data.line;
        let [pos1,pos2] = data.line;
        context.beginPath();
            context.lineWidth = 2
            context.moveTo(pos1.x * width , pos1.y * height)
            context.lineTo(pos2.x * width , pos2.y * height)
            context.stroke()
        context.close
    }  )


    function mainLoop () {
        //    Tratando de dibujar algo
        if (mouse.click && mouse.move && mouse.pos__prev){
            socket.emit('draw-line' , {line: [mouse.pos , mouse.pos__prev]});
            mouse.move = false;
        }
        mouse.pos__prev = {x :mouse.pos.x , y:mouse["pos"]["y"]}
        setTimeout(mainLoop,  .25)
    }

    mainLoop()
}


d.addEventListener('DOMContentLoaded',  init)
window.addEventListener('resize',    ()  =>  {
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width
    canvas.height = height
})