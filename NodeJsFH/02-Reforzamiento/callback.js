'use strict'
function decirHola() {
      console.log('Hola')
}
const interval = setInterval(decirHola,500)
setTimeout(()=>{
      clearInterval(interval)
} , 3000)


const getUserById = (id, callback) =>{
      const usuario = {
            id,
            nombre: 'Antonio'
      }
      setTimeout(()=>{
            callback( usuario )
      }, 1500);
}

getUserById(10, (usuario)=> {
      console.log('Hola mundo' + usuario.nombre)
});