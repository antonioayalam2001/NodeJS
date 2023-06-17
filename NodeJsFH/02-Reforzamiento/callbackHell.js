'use strict'
const empleados = [
      {
            id:1,
            nombre : 'Fernando'
      },
      {
            id:2,
            nombre : 'Tony'
      },
      {
            id:3,
            nombre : 'Ramon'
      }
]

const salarios = [
      {
            id:1,
            salario : 3000
      },
      {
            id:2,
            salario :2000
      },
]


const getEmpleado = (id,callback) =>{
      const empleado = empleados.find((e)=> e.id === id )
      if (empleado)
      {
            callback(null,empleado)
      }else
      {
            callback(`Empleado con id : ${id} no existe`)
      }

}
const id =1
const getSalario = ( id , callback) => {
      const salario = salarios.find( e => e.id ===id) ?.salario;
      if (salario){
            return callback(null,salario)
      }
      callback('Lo siento no encontramos ese Id')
}

getEmpleado(id, (err,empleado)=>{
      if (err){
            console.log('Error')
            console.log(err)
            return;
      }
      getSalario(id ,  (err,salario) => {
            if (err){
                  return console.log('Error', err)
            }
            console.log(empleado.nombre + salario)
      } )
})